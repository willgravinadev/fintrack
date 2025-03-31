import type { FastifyTypedInstance } from '../types'

import { healthCheckRoute } from './health-check.route'
import { usersRoutes } from './users/_users-routes'

export function fastifyRoutes(fastify: FastifyTypedInstance) {
  usersRoutes(fastify)
  healthCheckRoute(fastify)
}
