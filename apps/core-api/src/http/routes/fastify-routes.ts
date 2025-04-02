import type { FastifyTypedInstance } from '../types'

import { healthCheckRoute } from './health-check.route'
import { stockTransactionsRoutes } from './stock-transactions/_stock-transactions-routes'
import { stocksRoutes } from './stocks/_stocks-routes'
import { usersRoutes } from './users/_users-routes'
import { walletsRoutes } from './wallets/_wallets-routes'

export function fastifyRoutes(fastify: FastifyTypedInstance) {
  usersRoutes(fastify)
  stocksRoutes(fastify)
  walletsRoutes(fastify)
  stockTransactionsRoutes(fastify)
  healthCheckRoute(fastify)
}
