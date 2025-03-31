import fintrack from './dist/index.js'

export default fintrack(
  {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    react: true,
    next: true,
    playwright: true,
    testingLibrary: true,
    turbo: true,
    typescript: true
  },
  {
    ignores: ['eslint.config.bundled_*.mjs']
  }
)
