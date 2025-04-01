import type { FastifyTypedInstance } from '@/http/types'

import { HttpStatusCode } from '@fintrack/domain'
import { z } from 'zod'

import { makeSearchStocksBySymbolRestController } from '@/factories/rest-controllers/stocks/search-stocks-by-symbol-rest-controller.factory'
import { fastifyRouteAdapter } from '@/http/fastify.adapter'

import { Tags } from '../tags'

export function searchStocksBySymbolRoute(fastify: FastifyTypedInstance) {
  fastify.get(
    '/stocks/search',
    {
      schema: {
        tags: [Tags.STOCKS],
        description: 'Search stocks by symbol',
        summary: 'Search stocks by symbol',
        operationId: 'searchStocksBySymbol',
        querystring: z.object({
          symbol: z.string().optional(),
          page: z.number().optional(),
          limit: z.number().optional()
        }),
        response: {
          [HttpStatusCode.OK]: z
            .object({
              status: z.string(),
              success: z.object({
                foundStocks: z.array(
                  z.object({
                    id: z.string(),
                    symbol: z.string(),
                    shortName: z.string(),
                    longName: z.string(),
                    logoURL: z.string().nullable()
                  })
                ),
                pagination: z.object({
                  total: z.number(),
                  page: z.number(),
                  limit: z.number(),
                  totalPages: z.number(),
                  hasNextPage: z.boolean(),
                  hasPrevPage: z.boolean(),
                  nextPage: z.number().nullable(),
                  prevPage: z.number().nullable()
                })
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

    fastifyRouteAdapter(makeSearchStocksBySymbolRestController())
  )
}
