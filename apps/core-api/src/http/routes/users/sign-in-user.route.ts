import type { FastifyTypedInstance } from '@/http/types'

import { HttpStatusCode } from '@fintrack/domain'
import { z } from 'zod'

import { makeSignInUserRestController } from '@/factories/rest-controllers/users/sign-in-user-rest-controller.factory'
import { fastifyRouteAdapter } from '@/http/fastify.adapter'

import { Tags } from '../tags'

export function signInUserRoute(fastify: FastifyTypedInstance) {
  fastify.post(
    '/users/sign-in',
    {
      schema: {
        tags: [Tags.USERS],
        description: 'Sign in a user',
        summary: 'Sign in a user',
        body: z.object({
          credentials: z.object({
            email: z.string().email(),
            password: z.string().min(8)
          })
        }),
        operationId: 'signInUser',
        response: {
          [HttpStatusCode.OK]: z
            .object({
              status: z.string(),
              success: z.object({
                access_token: z.string().jwt()
              })
            })
            .describe('Success'),
          [HttpStatusCode.NOT_FOUND]: z
            .object({
              status: z.string(),
              error: z.object({
                message: z.string()
              })
            })
            .describe('Store employee not found by email'),
          [HttpStatusCode.BAD_REQUEST]: z
            .object({
              status: z.string(),
              error: z.object({
                message: z.string()
              })
            })
            .describe('Password is invalid'),
          [HttpStatusCode.NOT_ACCEPTABLE]: z
            .object({
              status: z.string(),
              error: z.object({
                message: z.string(),
                details: z.object({
                  issues: z.unknown(),
                  method: z.string(),
                  url: z.string()
                })
              })
            })
            .describe('Invalid request data')
        }
      }
    },
    fastifyRouteAdapter(makeSignInUserRestController())
  )
}
