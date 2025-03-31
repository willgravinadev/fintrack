import { Database } from '@fintrack/db'

import { FastifyFramework } from './http/fastify-app'

const start = async () => {
  const database = Database.getInstance()
  database.connect()
  const server = new FastifyFramework()
  await server.execute()
}

start()
