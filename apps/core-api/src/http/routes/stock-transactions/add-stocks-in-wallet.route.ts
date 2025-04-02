import type { FastifyTypedInstance } from '@/http/types'

import { HttpStatusCode } from '@fintrack/domain'
import { z } from 'zod'

import { makeAddStocksInWalletRestController } from '@/factories/rest-controllers/stock-transactions/add-stocks-in-wallet-rest-controller.factory'
import { fastifyRouteAdapter } from '@/http/fastify.adapter'

import { Tags } from '../tags'

export function addStocksInWalletRoute(fastify: FastifyTypedInstance) {
  fastify.post(
    '/stock-transactions/add-stocks-in-wallet',
    {
      schema: {
        tags: [Tags.STOCK_TRANSACTIONS],
        description: 'Add stocks in wallet',
        summary: 'Add stocks in wallet',
        operationId: 'addStocksInWallet',
        body: z.object({
          stockID: z.string().ulid(),
          walletID: z.string().ulid(),
          quantity: z.number().positive(),
          acquisitionPriceInCents: z.number().positive(),
          acquisitionAt: z.string().datetime()
        }),
        response: {
          [HttpStatusCode.OK]: z
            .object({
              status: z.string(),
              success: z.object({
                message: z.string(),
                transactionsCount: z.number()
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
            .describe('Stock already exists in wallet'),
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
            .describe('Invalid request data')
        }
      }
    },

    fastifyRouteAdapter(makeAddStocksInWalletRestController())
  )
}
