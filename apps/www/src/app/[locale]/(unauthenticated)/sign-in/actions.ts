'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import { signInUser } from '@/http/api'
import { COOKIE_CONFIG, COOKIE_KEYS } from '@/utils/constants.util'

export async function transformZodErrors(
  error: z.ZodError
): Promise<Array<{ path: string; message: string }>> {
  return await Promise.resolve(
    error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message
    }))
  )
}

export async function submitFormSignIn(formData: FormData) {
  try {
    // fake a delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const formSignInSchema = z.object({
      email: z.string({ message: 'Email is required' }).email('Email is invalid'),
      password: z
        .string({ message: 'Password is required' })
        .min(8, 'Password must be at least 8 characters')
    })

    //validate the FormData
    const validatedFields = formSignInSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    })

    console.log({ validatedFields })

    const result = await signInUser({
      credentials: { email: validatedFields.email, password: validatedFields.password }
    })

    if (result.status !== 200) {
      return { errors: { message: 'Invalid credentials' }, data: null }
    }
    const cookiesInstance = await cookies()
    cookiesInstance.set(COOKIE_KEYS.ACCESS_TOKEN, result.data.success.access_token, {
      path: COOKIE_CONFIG.PATH,
      maxAge: COOKIE_CONFIG.MAX_AGE
    })

    return { errors: null, data: 'Signed in successfully' }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { errors: await transformZodErrors(error), data: null }
    }

    return {
      errors: { message: 'An unexpected error occurred. Could not sign in.' },
      data: null
    }
  }
}
