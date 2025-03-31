import fintrack from '@fintrack/eslint-config'

export default fintrack(
  {
    project: './tsconfig.json',
    tsconfigRootDir: import.meta.dirname,
    react: true,
    next: true,
    turbo: true
  },
  {
    rules: {
      'sonarjs/no-useless-intersection': 'off'
    }
  }
)
