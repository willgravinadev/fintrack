import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:2222/docs/json'
    },
    output: {
      target: './src/lib/api.ts',
      client: 'react-query',
      httpClient: 'fetch',
      clean: true,
      mock: true,
      baseUrl: 'http://localhost:2222',
      override: {
        mutator: {
          path: './src/utils/custom-fetch.util.ts',
          name: 'customFetch'
        }
      }
    }
  }
})
