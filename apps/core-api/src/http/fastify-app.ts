import type { ISendLogErrorLoggerProvider, ISendLogInfoLoggerProvider } from '@fintrack/domain'

import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { HttpStatusCode } from '@fintrack/domain'
import { env } from '@fintrack/env'
import { makeLoggerProvider } from '@fintrack/logger'
import {
  fastify,
  type FastifyError,
  type FastifyInstance,
  type FastifyServerOptions
} from 'fastify'
import {
  createJsonSchemaTransformObject,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

import pkg from '../../package.json'

import { STORE_EMPLOYEE_SCHEMA } from './documentation/schema/store-employee.schema'
import { fastifyRoutes } from './routes/fastify-routes'

export class FastifyFramework {
  public app: FastifyInstance
  private readonly port = env.CORE_API_PORT || 3000
  private readonly loggerProvider: ISendLogErrorLoggerProvider & ISendLogInfoLoggerProvider

  constructor(options: FastifyServerOptions = {}) {
    this.loggerProvider = makeLoggerProvider()
    this.app = fastify(options).withTypeProvider<ZodTypeProvider>()
    // this.app.register(fastifyMultipart)
    this.setupValidation()
    this.setupCors()
    this.setupSwagger()
    this.setupErrorHandler()
    this.setupRoutes()
  }

  /**
   * Start the server
   */
  public async execute(): Promise<FastifyInstance> {
    try {
      await this.app.listen({ port: this.port })
      this.loggerProvider.sendLogInfo({
        message: `Server is running... 🚀 in port ${this.port}`
      })
      return this.app
    } catch (error) {
      this.loggerProvider.sendLogError({
        message: 'Error starting server',
        value: error
      })
      throw new Error('Failed to start server')
    }
  }

  /**
   * Setup validation compilers
   */
  private setupValidation(): void {
    this.app.setValidatorCompiler(validatorCompiler)
    this.app.setSerializerCompiler(serializerCompiler)
  }

  /**
   * Setup CORS
   */
  private setupCors(): void {
    this.app.register(fastifyCors, {
      origin: true
    })
  }

  /**
   * Setup Swagger documentation
   */
  private setupSwagger(): void {
    // Register Swagger
    this.app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Fintrack Core Server',
          description: 'Fintrack Core Server API',
          version: pkg.version
        }
      },
      transform: jsonSchemaTransform,
      transformObject: createJsonSchemaTransformObject({
        schemas: {
          store_employee: STORE_EMPLOYEE_SCHEMA
        }
      })
    })

    const theme = new SwaggerTheme()
    const content = theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK)

    // Register Swagger UI with dark theme
    this.app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: true,
        syntaxHighlight: {
          theme: 'nord',
          activate: true
        }
      },
      theme: {
        css: [{ filename: 'theme.css', content }]
      }
    })
  }

  /**
   * Setup global error handler
   */
  private setupErrorHandler(): void {
    this.app.setErrorHandler((error: FastifyError, request, reply) => {
      // Handle validation errors
      if (hasZodFastifySchemaValidationErrors(error)) {
        return reply.status(HttpStatusCode.NOT_ACCEPTABLE).send({
          status: 'error',
          error: {
            message: 'Invalid request data',
            details: {
              issues: error.validation,
              method: request.method,
              url: request.url
            }
          }
        })
      }

      // Log unexpected errors
      if (error.statusCode && error.statusCode >= 500) {
        this.loggerProvider.sendLogError({
          message: `Unhandled error: ${error.message}`,
          value: error
        })
      }

      // Handle general errors
      return reply.status(error.statusCode ?? 500).send({
        status: 'error',
        error: {
          message: error.message || 'Internal Server Error',
          code: error.code
        }
      })
    })
  }

  /**
   * Setup routes
   */
  private setupRoutes(): void {
    this.app.register(fastifyRoutes)
  }
}
