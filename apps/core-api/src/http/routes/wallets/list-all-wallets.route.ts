import type { FastifyTypedInstance } from '@/http/types'

import { HttpStatusCode } from '@fintrack/domain'
import { z } from 'zod'

import { makeListAllWalletsRestController } from '@/factories/rest-controllers/wallets/list-all-wallets-rest-controller.factory'
import { fastifyRouteAdapter } from '@/http/fastify.adapter'

import { Tags } from '../tags'

export function listAllWalletsRoute(fastify: FastifyTypedInstance) {
  fastify.get(
    '/wallets/list-all',
    {
      schema: {
        tags: [Tags.WALLETS],
        description: 'List all wallets',
        summary: 'List all wallets',
        operationId: 'listAllWallets',
        response: {
          [HttpStatusCode.OK]: z
            .object({
              status: z.string(),
              success: z.object({
                walletList: z.array(
                  z.object({
                    wallet: z.object({
                      id: z.string(),
                      name: z.string()
                    }),
                    stockAggregatedInvestments: z.array(
                      z.object({
                        id: z.string(),
                        symbol: z.string(),
                        shareCount: z.number(),
                        averagePurchasePriceInCents: z.number(),
                        currentMarketPriceInCents: z.number(),
                        totalInvestmentValueInCents: z.number()
                      })
                    )
                  })
                )
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

    fastifyRouteAdapter(makeListAllWalletsRestController())
  )
}
