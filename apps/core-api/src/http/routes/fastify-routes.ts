import type { FastifyTypedInstance } from '../types'

import { healthCheckRoute } from './health-check.route'
import { stocksRoutes } from './stocks/_stocks-routes'
import { usersRoutes } from './users/_users-routes'

export function fastifyRoutes(fastify: FastifyTypedInstance) {
  usersRoutes(fastify)
  stocksRoutes(fastify)
  healthCheckRoute(fastify)
}
