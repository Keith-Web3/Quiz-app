'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { cookies } from 'next/headers'
import axios from 'axios'

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const authToken = cookies().get(process.env.JWT_NAME!)?.value
    console.log('read token as:', authToken)
    config.headers.Authorization = `Bearer ${authToken}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

export async function signup(_formStatus: any, formData: FormData) {
  const schema = z.object({
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid Email',
    }),
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(3, 'Name must be 3 or more characters long'),
    password: z
      .string({
        required_error: 'Please provide a password',
      })
      .min(8, 'Password must be 8 characters or more'),
    passwordConfirm: z
      .string()
      .refine(value => value === formData.get('password'), {
        message: 'Passwords are not the same',
      }),
  })

  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    passwordConfirm: formData.get('passwordConfirm'),
  })

  if (!validatedFields.success) {
    const { message, path } = JSON.parse(validatedFields.error.message)[0] as {
      message: string
      path: string
    }
    return { message, path }
  }

  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/v1/api/auth/signup`,
      validatedFields.data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const jwtArr = response.headers['set-cookie']![0].split(';')
    const authToken = jwtArr[0].slice(4)
    const cookieExpiresAt = new Date(jwtArr[0].slice(9))

    cookies().set(process.env.JWT_NAME!, authToken, {
      expires: cookieExpiresAt.getTime(),
    })
  } catch (err: any) {
    return { message: err.response?.data.message, path: '' }
  }
  redirect('/')
}

export async function login(_formStatus: any, formData: FormData) {
  const schema = z.object({
    email: z.string({
      required_error: 'Email is required',
      invalid_type_error: 'Invalid Email',
    }),
    password: z
      .string({
        required_error: 'Please provide a password',
      })
      .min(8, 'Password must be 8 characters or more'),
  })

  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    const { message, path } = JSON.parse(validatedFields.error.message)[0] as {
      message: string
      path: string
    }
    return { message, path }
  }

  try {
    const response = await axios.post(
      `${process.env.SERVER_URL}/v1/api/auth/login`,
      {
        ...validatedFields.data,
        rememberUser: formData.get('remember') === 'on',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const jwtArr = response.headers['set-cookie']![0].split(';')
    const authToken = jwtArr[0].slice(4)
    const cookieExpiresAt = new Date(jwtArr[0].slice(9))

    cookies().set(process.env.JWT_NAME!, authToken, {
      expires: cookieExpiresAt.getTime(),
    })
  } catch (err: any) {
    console.log('error:', err.response?.data) //TODO remove log

    return { message: err.response?.data.message, path: '' }
  }
  redirect('/')
}

export async function getMe() {
  const token = cookies().get(process.env.JWT_NAME!)?.value
  const response = await fetch(
    `${process.env.SERVER_URL}/v1/api/users/current-user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const user = await response.json()

  return user
}
