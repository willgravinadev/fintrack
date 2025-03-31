import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src'],
  splitting: false,
  sourcemap: true,
  clean: true,
  noExternal: [
    '@fintrack/crypto',
    '@fintrack/domain',
    '@fintrack/env',
    '@fintrack/logger',
    '@fintrack/token',
    '@fintrack/utils',
    '@fintrack/db'
  ]
})
