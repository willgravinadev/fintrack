import type { FastifyTypedInstance } from '@/http/types'

import { createWalletRoute } from './create-wallet.route'
import { listAllWalletsRoute } from './list-all-wallets.route'

export function walletsRoutes(fastify: FastifyTypedInstance) {
  createWalletRoute(fastify)
  listAllWalletsRoute(fastify)
}
