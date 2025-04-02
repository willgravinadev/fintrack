import type { FastifyTypedInstance } from '@/http/types'

import { HttpStatusCode } from '@fintrack/domain'
import { z } from 'zod'

import { makeDisposalStockRestController } from '@/factories/rest-controllers/stock-transactions/disposal-stock-rest-controller.factory'
import { fastifyRouteAdapter } from '@/http/fastify.adapter'

import { Tags } from '../tags'

export function disposalStockRoute(fastify: FastifyTypedInstance) {
  fastify.post(
    '/stock-transactions/disposal-stock',
    {
      schema: {
        tags: [Tags.STOCK_TRANSACTIONS],
        description: 'Disposal stock',
        summary: 'Disposal stock',
        operationId: 'disposalStock',
        body: z.object({
          stockID: z.string().ulid(),
          walletID: z.string().ulid(),
          disposalPriceInCents: z.number().positive(),
          disposalAt: z.string().datetime()
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
            .describe('Stock not found in wallet'),
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

    fastifyRouteAdapter(makeDisposalStockRestController())
  )
}
