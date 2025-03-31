import type { FastifyTypedInstance } from '../types'

import { usersRoutes } from './users/_users-routes'

export function fastifyRoutes(fastify: FastifyTypedInstance) {
  usersRoutes(fastify)
}
