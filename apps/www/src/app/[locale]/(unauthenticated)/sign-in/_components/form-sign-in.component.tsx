'use client'

import { useTranslations } from '@fintrack/i18n/client'
import { useRouter } from '@fintrack/i18n/routing'
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast
} from '@fintrack/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Mail } from 'lucide-react'
import { type JSX, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { submitFormSignIn } from '../actions'

export function FormSignInComponent(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const toggleVisibility = () => setIsVisible((prevState) => !prevState)
  const router = useRouter()

  const t = useTranslations('sign-in')

  const formSignInSchema = z.object({
    email: z.string({ message: t('email-required') }).email(t('email-invalid')),
    password: z.string({ message: t('password-required') }).min(8, t('password-min-length'))
  })

  type FormSignInSchema = z.infer<typeof formSignInSchema>

  const form = useForm<FormSignInSchema>({
    resolver: zodResolver(formSignInSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmitForm: SubmitHandler<FormSignInSchema> = async (data) => {
    console.log({ data })
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    // call the server action
    const { data: success, errors } = await submitFormSignIn(formData)

    if (errors && Array.isArray(errors)) {
      for (const error of errors) {
        form.setError(error.path as keyof FormSignInSchema, { message: error.message })
      }
    }

    if (errors && typeof errors === 'object' && 'message' in errors) {
      toast.error(errors.message)
    }

    if (success) {
      toast.success(t('toast-success'))
      form.reset()
      router.push('/dashboard')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitForm)} className='mt-10 w-full px-4'>
        <FormField
          control={form.control}
          name='email'
          render={() => (
            <FormItem className='w-full'>
              <FormControl>
                <div className='relative w-full'>
                  <Input
                    id='email'
                    className='w-full pe-9'
                    placeholder='Email'
                    type='email'
                    {...form.register('email')}
                  />
                  <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50'>
                    <Mail size={16} strokeWidth={2} aria-hidden='true' />
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={() => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <div className='relative w-full'>
                  <Input
                    id='password'
                    className='pe-9'
                    placeholder='Password'
                    type={isVisible ? 'text' : 'password'}
                    {...form.register('password')}
                  />
                  <button
                    id='password-toggle'
                    className='text-muted-foreground/80 hover:text-foreground focus-visible:outline-ring/70 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg outline-offset-2 transition-colors focus:z-10 focus-visible:outline focus-visible:outline-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
                    type='button'
                    onClick={toggleVisibility}
                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                    aria-pressed={isVisible}
                    aria-controls='password'
                  >
                    {isVisible ? (
                      <EyeOff size={16} strokeWidth={2} aria-hidden='true' />
                    ) : (
                      <Eye size={16} strokeWidth={2} aria-hidden='true' />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
          data-loading={form.formState.isSubmitting}
          isPending={form.formState.isSubmitting}
          isSuccess={form.formState.isSubmitSuccessful}
          className='mt-1 w-full cursor-pointer'
          type='submit'
        >
          {t('button')}
        </Button>
      </form>
    </Form>
  )
}
