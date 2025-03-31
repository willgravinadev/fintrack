import fintrack from '@fintrack/eslint-config'

export default fintrack({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
  typescript: true,
  turbo: true,
  rules: {
    '@typescript-eslint/restrict-template-expressions': 'off'
  }
})
