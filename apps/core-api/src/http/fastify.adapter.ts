import type { FastifyReply, FastifyRequest } from 'fastify'

import { HttpStatusCode } from '@fintrack/domain'
import {
  type HttpRequest,
  type HttpResponse,
  type HttpResponseError,
  type IController
} from '@fintrack/domain'

export function fastifyRouteAdapter<TRequest, TResponse>(
  controller: IController<TRequest, TResponse>
) {
  return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const httpRequest = adaptRequest(request)
      const result = await controller.handle(httpRequest as never)
      await adaptResponse(reply, result)
    } catch (error) {
      await handleError(reply, error)
    }
  }
}

function adaptRequest(request: FastifyRequest): HttpRequest {
  return {
    body: request.body,
    query: request.query,
    params: request.params,
    headers: request.headers,
    access_token: request.headers.authorization?.replace('Bearer ', '') ?? '',
    file: undefined
  }
}

async function adaptResponse(reply: FastifyReply, result: HttpResponse<unknown>): Promise<void> {
  const { statusCode, data, headers } = result

  // Set any custom headers if provided
  if (headers) {
    for (const [key, value] of Object.entries(headers)) {
      if (value) {
        reply.header(key, value)
      }
    }
  }

  if (statusCode >= HttpStatusCode.BAD_REQUEST) {
    const isError = isErrorResponse(data)
    return isError
      ? reply.status(statusCode).send({
          status: data.status,
          error: {
            message: data.errorMessage
          }
        })
      : reply.status(statusCode).send({
          error: {
            message: 'Unknown error'
          }
        })
  }

  // Success response
  return await reply.status(statusCode).send(data)
}

function isErrorResponse(data: unknown): data is HttpResponseError {
  return typeof data === 'object' && data !== null && 'status' in data && 'errorMessage' in data
}

async function handleError(reply: FastifyReply, error: unknown): Promise<void> {
  console.error('Unhandled error in FastifyAdapter:', error)

  await reply.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
    status: 'INTERNAL_SERVER_ERROR',
    error: {
      message: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  })
}
