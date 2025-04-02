import type { FastifyTypedInstance } from '@/http/types'

import { addStocksInWalletRoute } from './add-stocks-in-wallet.route'
import { disposalStockRoute } from './disposal-stock.route'

export function stockTransactionsRoutes(fastify: FastifyTypedInstance) {
  addStocksInWalletRoute(fastify)
  disposalStockRoute(fastify)
}
