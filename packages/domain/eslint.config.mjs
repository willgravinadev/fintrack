import fintrack from '@fintrack/eslint-config'

export default fintrack({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
})
