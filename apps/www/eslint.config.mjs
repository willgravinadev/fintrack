import fintrack, { GLOB_E2E } from '@fintrack/eslint-config'

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
    files: [GLOB_E2E],
    ignores: ['./src/http/api.ts'],
    rules: {
      'sonarjs/function-return-type': 'off',
      'playwright/expect-expect': [
        'error',
        {
          assertFunctionNames: ['checkStoredTheme', 'checkAppliedTheme', 'a11y']
        }
      ]
    }
  }
)
