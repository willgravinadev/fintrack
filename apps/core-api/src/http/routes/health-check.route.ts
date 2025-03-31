import type { FastifyTypedInstance } from '@/http/types'

export function healthCheckRoute(fastify: FastifyTypedInstance) {
  fastify.get('/health-check', async (_request, reply) => {
    return reply.status(200).send({ message: 'OK' })
  })
}
