import type { FastifyTypedInstance } from '../types'

import { usersRoutes } from './store-employees/_users-routes'

export function fastifyRoutes(fastify: FastifyTypedInstance) {
  usersRoutes(fastify)
}
