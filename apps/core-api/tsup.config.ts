import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: [
    '@fintrack/crypto',
    '@fintrack/db',
    '@fintrack/domain',
    '@fintrack/env',
    '@fintrack/logger',
    '@fintrack/token',
    '@fintrack/utils'
  ]
})
