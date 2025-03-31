import type { FastifyTypedInstance } from '@/http/types'

import { signInUserRoute } from './sign-in-user.route'
import { signUpUserRoute } from './sign-up-user.route'

export function usersRoutes(fastify: FastifyTypedInstance) {
  signInUserRoute(fastify)
  signUpUserRoute(fastify)
}
