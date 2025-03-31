/* eslint-disable eslint-comments/disable-enable-pair -- this is a generated file */
/* eslint-disable sonarjs/redundant-type-aliases -- this is a generated file */
/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Fintrack Core Server
 * Fintrack Core Server API
 * OpenAPI spec version: 0.0.1
 */
import type { MutationFunction, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'

import { faker } from '@faker-js/faker'
import { useMutation } from '@tanstack/react-query'
import { delay, http, HttpResponse } from 'msw'

import { customFetch } from '../utils/custom-fetch.util'

export interface StoreEmployee {
  id: string
  /** The name of the store employee */
  name: string
  /** The email of the store employee */
  email: string
  /**
   * The password of the store employee
   * @minLength 8
   */
  password: string
  /** The date and time of the creation of the store employee */
  created_at: string
}

export type SignInUserBodyCredentials = {
  email: string
  /** @minLength 8 */
  password: string
}

export type SignInUserBody = {
  credentials: SignInUserBodyCredentials
}

export type SignInUser200Success = {
  /** @pattern ^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$ */
  access_token: string
}

/**
 * Success
 */
export type SignInUser200 = {
  status: string
  success: SignInUser200Success
}

export type SignInUser400Error = {
  message: string
}

/**
 * Password is invalid
 */
export type SignInUser400 = {
  status: string
  error: SignInUser400Error
}

export type SignInUser404Error = {
  message: string
}

/**
 * Store employee not found by email
 */
export type SignInUser404 = {
  status: string
  error: SignInUser404Error
}

export type SignInUser406ErrorDetails = {
  issues?: unknown
  method: string
  url: string
}

export type SignInUser406Error = {
  message: string
  details: SignInUser406ErrorDetails
}

/**
 * Invalid request data
 */
export type SignInUser406 = {
  status: string
  error: SignInUser406Error
}

export type SignUpUserBodyNewUser = {
  email: string
  /** @minLength 8 */
  password: string
  /** @minLength 1 */
  name: string
}

export type SignUpUserBody = {
  newUser: SignUpUserBodyNewUser
}

export type SignUpUser201Success = {
  /** @pattern ^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$ */
  access_token: string
}

/**
 * Success
 */
export type SignUpUser201 = {
  status: string
  success: SignUpUser201Success
}

export type SignUpUser400Error = {
  message: string
}

/**
 * Password is invalid
 */
export type SignUpUser400 = {
  status: string
  error: SignUpUser400Error
}

export type SignUpUser406ErrorDetails = {
  issues?: unknown
  method: string
  url: string
}

export type SignUpUser406Error = {
  message: string
  details: SignUpUser406ErrorDetails
}

/**
 * Invalid request data
 */
export type SignUpUser406 = {
  status: string
  error: SignUpUser406Error
}

export type SignUpUser409Error = {
  message: string
}

/**
 * User already exists
 */
export type SignUpUser409 = {
  status: string
  error: SignUpUser409Error
}

type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1]

/**
 * Sign in a user
 * @summary Sign in a user
 */
export type signInUserResponse200 = {
  data: SignInUser200
  status: 200
}

export type signInUserResponse400 = {
  data: SignInUser400
  status: 400
}

export type signInUserResponse404 = {
  data: SignInUser404
  status: 404
}

export type signInUserResponse406 = {
  data: SignInUser406
  status: 406
}

export type signInUserResponseComposite =
  | signInUserResponse200
  | signInUserResponse400
  | signInUserResponse404
  | signInUserResponse406

export type signInUserResponse = signInUserResponseComposite & {
  headers: Headers
}

export const getSignInUserUrl = () => {
  return `http://localhost:2222/users/sign-in`
}

export const signInUser = async (
  signInUserBody: SignInUserBody,
  options?: RequestInit
): Promise<signInUserResponse> => {
  return customFetch<signInUserResponse>(getSignInUserUrl(), {
    ...options,
    method: 'POST',
    // eslint-disable-next-line @typescript-eslint/no-misused-spread -- headers is an object
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(signInUserBody)
  })
}

export const getSignInUserMutationOptions = <
  TError = SignInUser400 | SignInUser404 | SignInUser406,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signInUser>>,
    TError,
    { data: SignInUserBody },
    TContext
  >
  request?: SecondParameter<typeof customFetch>
}): UseMutationOptions<
  Awaited<ReturnType<typeof signInUser>>,
  TError,
  { data: SignInUserBody },
  TContext
> => {
  const mutationKey = ['signInUser']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? // eslint-disable-next-line sonarjs/no-nested-conditional -- options is an object
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof signInUser>>,
    { data: SignInUserBody }
  > = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- props is an object
    const { data } = props ?? {}

    return signInUser(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SignInUserMutationResult = NonNullable<Awaited<ReturnType<typeof signInUser>>>
export type SignInUserMutationBody = SignInUserBody
export type SignInUserMutationError = SignInUser400 | SignInUser404 | SignInUser406

/**
 * @summary Sign in a user
 */
export const useSignInUser = <
  TError = SignInUser400 | SignInUser404 | SignInUser406,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signInUser>>,
    TError,
    { data: SignInUserBody },
    TContext
  >
  request?: SecondParameter<typeof customFetch>
}): UseMutationResult<
  Awaited<ReturnType<typeof signInUser>>,
  TError,
  { data: SignInUserBody },
  TContext
> => {
  const mutationOptions = getSignInUserMutationOptions(options)

  return useMutation(mutationOptions)
}

/**
 * Sign up a user
 * @summary Sign up a user
 */
export type signUpUserResponse201 = {
  data: SignUpUser201
  status: 201
}

export type signUpUserResponse400 = {
  data: SignUpUser400
  status: 400
}

export type signUpUserResponse406 = {
  data: SignUpUser406
  status: 406
}

export type signUpUserResponse409 = {
  data: SignUpUser409
  status: 409
}

export type signUpUserResponseComposite =
  | signUpUserResponse201
  | signUpUserResponse400
  | signUpUserResponse406
  | signUpUserResponse409

export type signUpUserResponse = signUpUserResponseComposite & {
  headers: Headers
}

export const getSignUpUserUrl = () => {
  return `http://localhost:2222/users/sign-up`
}

export const signUpUser = async (
  signUpUserBody: SignUpUserBody,
  options?: RequestInit
): Promise<signUpUserResponse> => {
  return customFetch<signUpUserResponse>(getSignUpUserUrl(), {
    ...options,
    method: 'POST',
    // eslint-disable-next-line @typescript-eslint/no-misused-spread -- headers is an object
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(signUpUserBody)
  })
}

export const getSignUpUserMutationOptions = <
  TError = SignUpUser400 | SignUpUser406 | SignUpUser409,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signUpUser>>,
    TError,
    { data: SignUpUserBody },
    TContext
  >
  request?: SecondParameter<typeof customFetch>
}): UseMutationOptions<
  Awaited<ReturnType<typeof signUpUser>>,
  TError,
  { data: SignUpUserBody },
  TContext
> => {
  const mutationKey = ['signUpUser']
  const { mutation: mutationOptions, request: requestOptions } = options
    ? // eslint-disable-next-line sonarjs/no-nested-conditional -- options is an object
      options.mutation && 'mutationKey' in options.mutation && options.mutation.mutationKey
      ? options
      : { ...options, mutation: { ...options.mutation, mutationKey } }
    : { mutation: { mutationKey }, request: undefined }

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof signUpUser>>,
    { data: SignUpUserBody }
  > = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- props is an object
    const { data } = props ?? {}

    return signUpUser(data, requestOptions)
  }

  return { mutationFn, ...mutationOptions }
}

export type SignUpUserMutationResult = NonNullable<Awaited<ReturnType<typeof signUpUser>>>

export type SignUpUserMutationBody = SignUpUserBody
export type SignUpUserMutationError = SignUpUser400 | SignUpUser406 | SignUpUser409

/**
 * @summary Sign up a user
 */
export const useSignUpUser = <
  TError = SignUpUser400 | SignUpUser406 | SignUpUser409,
  TContext = unknown
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof signUpUser>>,
    TError,
    { data: SignUpUserBody },
    TContext
  >
  request?: SecondParameter<typeof customFetch>
}): UseMutationResult<
  Awaited<ReturnType<typeof signUpUser>>,
  TError,
  { data: SignUpUserBody },
  TContext
> => {
  const mutationOptions = getSignUpUserMutationOptions(options)

  return useMutation(mutationOptions)
}

export const getSignInUserResponseMock = (
  overrideResponse: Partial<SignInUser200> = {}
): SignInUser200 => ({
  status: faker.string.alpha(20),
  success: {
    access_token: faker.helpers.fromRegExp(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/)
  },
  ...overrideResponse
})

export const getSignUpUserResponseMock = (
  overrideResponse: Partial<SignUpUser201> = {}
  // eslint-disable-next-line sonarjs/no-identical-functions -- getSignInUserResponseMock is a function
): SignUpUser201 => ({
  status: faker.string.alpha(20),
  success: {
    access_token: faker.helpers.fromRegExp(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/)
  },
  ...overrideResponse
})

export const getSignInUserMockHandler = (
  overrideResponse?:
    | SignInUser200
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0]
      ) => Promise<SignInUser200> | SignInUser200)
) => {
  return http.post('*/users/sign-in', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse === undefined
          ? getSignInUserResponseMock()
          : // eslint-disable-next-line sonarjs/no-nested-conditional -- overrideResponse is a function
            typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
      ),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  })
}

export const getSignUpUserMockHandler = (
  overrideResponse?:
    | SignUpUser201
    | ((
        info: Parameters<Parameters<typeof http.post>[1]>[0]
      ) => Promise<SignUpUser201> | SignUpUser201)
) => {
  return http.post('*/users/sign-up', async (info) => {
    await delay(1000)

    return new HttpResponse(
      JSON.stringify(
        overrideResponse === undefined
          ? getSignUpUserResponseMock()
          : // eslint-disable-next-line sonarjs/no-nested-conditional -- overrideResponse is a function
            typeof overrideResponse === 'function'
            ? await overrideResponse(info)
            : overrideResponse
      ),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  })
}
export const getFintrackCoreServerMock = () => [
  getSignInUserMockHandler(),
  getSignUpUserMockHandler()
]
