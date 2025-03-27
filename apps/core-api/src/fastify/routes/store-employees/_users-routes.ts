import type { FastifyTypedInstance } from '@/fastify/types'

import { signInUserRoute } from '@/fastify/routes/store-employees/sign-in-user.route'

export function usersRoutes(fastify: FastifyTypedInstance) {
  signInUserRoute(fastify)
}
