'use client'
import Link from 'next/link'
import { useFormState } from 'react-dom'

import Input from '@/components/Input'
import Button from '../Button'
import { login } from '@/actions/server'

import '@/sass/pages/login.scss'
import toast from 'react-hot-toast'

interface LoginProps {}

const Login = function ({}: LoginProps) {
  const [formState, action] = useFormState(login, { message: '', path: '' })
  if (formState.message && formState.path === '') {
    toast.error(formState.message)
  }
  return (
    <div className="login">
      <p className="login__header">Welcome back</p>
      <p className="login__subheader">
        Welcome back, please enter your details
      </p>
      <form action={action}>
        <Input
          formState={formState}
          htmlFor="email"
          label="email"
          type="email"
          placeholder="enter your email"
        />
        <Input
          formState={formState}
          htmlFor="password"
          label="password"
          type="password"
          minLength={8}
          placeholder="enter your password"
        />
        <div className="login__options">
          <label htmlFor="remember">
            <input type="checkbox" id="remember" />
            Remember for 30 days
          </label>
          <Link href="/">forgot password</Link>
        </div>
        <Button>sign in</Button>
      </form>
      <p className="login__signup">
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>{' '}
      </p>
    </div>
  )
}

export default Login
