import type { FastifyTypedInstance } from '@/http/types'

import { HttpStatusCode } from '@fintrack/domain'
import { z } from 'zod'

import { makeSignUpUserRestController } from '@/factories/rest-controllers/users/sign-up-user-rest-controller.factory'
import { fastifyRouteAdapter } from '@/http/fastify.adapter'

import { Tags } from '../tags'

export function signUpUserRoute(fastify: FastifyTypedInstance) {
  fastify.post(
    '/users/sign-up',
    {
      schema: {
        tags: [Tags.USERS],
        description: 'Sign up a user',
        summary: 'Sign up a user',
        body: z.object({
          newUser: z.object({
            email: z.string().email(),
            password: z.string().min(8),
            name: z.string().min(1)
          })
        }),
        operationId: 'signUpUser',
        response: {
          [HttpStatusCode.CREATED]: z
            .object({
              status: z.string(),
              success: z.object({
                access_token: z.string().jwt()
              })
            })
            .describe('Success'),
          [HttpStatusCode.CONFLICT]: z
            .object({
              status: z.string(),
              error: z.object({
                message: z.string()
              })
            })
            .describe('User already exists'),
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

    fastifyRouteAdapter(makeSignUpUserRestController())
  )
}
