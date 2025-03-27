import { z } from 'zod'

export const STORE_EMPLOYEE_SCHEMA = z.object({
  id: z.string().uuid(),
  name: z.string().describe('The name of the store employee'),
  email: z.string().email().describe('The email of the store employee'),
  password: z.string().min(8).describe('The password of the store employee'),
  created_at: z
    .string()
    .datetime()
    .describe('The date and time of the creation of the store employee')
})
