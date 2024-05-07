'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { cookies } from 'next/headers'

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
    const response = await fetch(
      `${process.env.SERVER_URL}/v1/api/auth/signup`,
      {
        method: 'POST',
        body: JSON.stringify(validatedFields.data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()
    if (!response.ok) {
      return { message: data.message, path: '' }
    }

    cookies().set(process.env.JWT_NAME!, data.token, {
      expires: Date.now() + +process.env.JWT_EXPIRES_IN! * 24 * 60 * 60 * 1000,
    })
  } catch (err) {
    return { message: err, path: '' }
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

  console.log(formData.get('remember'))

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
    const response = await fetch(
      `${process.env.SERVER_URL}/v1/api/auth/login`,
      {
        method: 'POST',
        body: JSON.stringify({
          ...validatedFields.data,
          rememberUser: formData.get('remember') === 'on',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-cache',
      }
    )
    const data = await response.json()

    console.log('user data', data)
    if (!response.ok) {
      return { message: data.message, path: '' }
    }

    console.log(response.headers.get('jwt'))

    cookies().set(process.env.JWT_NAME!, data.token, {
      expires:
        Date.now() +
        +process.env.JWT_EXPIRES_IN! *
          (formData.get('remember') ? 30 : 7) *
          24 *
          60 *
          60 *
          1000,
    })
  } catch (err) {
    console.log('error:', err)
    return { message: err, path: '' }
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
