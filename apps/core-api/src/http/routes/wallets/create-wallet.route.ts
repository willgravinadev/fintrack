import type { FastifyTypedInstance } from '@/http/types'

import { HttpStatusCode } from '@fintrack/domain'
import { z } from 'zod'

import { makeCreateWalletRestController } from '@/factories/rest-controllers/wallets/create-wallet-rest-controller.factory'
import { fastifyRouteAdapter } from '@/http/fastify.adapter'

import { Tags } from '../tags'

export function createWalletRoute(fastify: FastifyTypedInstance) {
  fastify.post(
    '/wallets/create',
    {
      schema: {
        tags: [Tags.WALLETS],
        description: 'Create a wallet',
        summary: 'Create a wallet',
        body: z.object({
          newWallet: z.object({
            name: z.string()
          })
        }),
        operationId: 'createWallet',
        response: {
          [HttpStatusCode.OK]: z
            .object({
              status: z.string(),
              success: z.object({
                walletCreated: z.object({
                  id: z.string(),
                  name: z.string()
                })
              })
            })
            .describe('Success'),
          [HttpStatusCode.BAD_REQUEST]: z
            .object({
              status: z.string(),
              error: z.object({
                message: z.string()
              })
            })
            .describe('Invalid request data'),
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
            .describe('Invalid request data'),
          [HttpStatusCode.UNAUTHORIZED]: z
            .object({
              status: z.string(),
              error: z.object({
                message: z.string()
              })
            })
            .describe('Unauthorized'),
          [HttpStatusCode.INTERNAL_SERVER_ERROR]: z
            .object({
              status: z.string(),
              error: z.object({
                message: z.string()
              })
            })
            .describe('Internal server error')
        }
      }
    },

    fastifyRouteAdapter(makeCreateWalletRestController())
  )
}
