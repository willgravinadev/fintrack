import type { FastifyTypedInstance } from '@/http/types'

import { searchStocksBySymbolRoute } from './search-stocks-by-symbol.route'

export function stocksRoutes(fastify: FastifyTypedInstance) {
  searchStocksBySymbolRoute(fastify)
}
