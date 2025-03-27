import { FastifyFramework } from './fastify/fastify-app'

export const server = new FastifyFramework()

server.execute()
