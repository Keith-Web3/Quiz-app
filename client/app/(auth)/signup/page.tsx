'use client'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import toast from 'react-hot-toast'

import Input from '@/components/Input'
import Button from '../Button'
import { signup } from '@/actions/server'

import '@/sass/pages/signup.scss'

interface SignupProps {}

const Signup = function ({}: SignupProps) {
  const [formState, action] = useFormState(signup, {
    message: '',
    path: '',
  })
  if (formState.message && formState.path === '') {
    toast.error(formState.message)
  }

  return (
    <div className="signup">
      <p className="signup__header">Hello bookworm 🪱</p>
      <p className="signup__subheader">
        📚 Sign up to unlock a world of literary wonders! 🌟
      </p>
      <form action={action}>
        <Input
          htmlFor="name"
          label="name"
          type="text"
          formState={formState}
          minLength={3}
          placeholder="enter your name"
        />
        <Input
          htmlFor="email"
          label="email"
          type="email"
          formState={formState}
          placeholder="enter your email"
        />
        <Input
          htmlFor="password"
          label="password"
          type="password"
          formState={formState}
          minLength={8}
          placeholder="enter your password"
        />
        <Input
          htmlFor="passwordConfirm"
          label="confirm password"
          type="password"
          formState={formState}
          minLength={8}
          placeholder="confirm your password"
        />
        <Button>sign up</Button>
      </form>
      <p className="signup__login">
        Already have an account? <Link href="/login">Sign in</Link>{' '}
      </p>
    </div>
  )
}

export default Signup
