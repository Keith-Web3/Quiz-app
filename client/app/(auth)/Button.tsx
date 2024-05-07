'use client'
import { ComponentPropsWithRef, ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import '@/sass/components/auth-btn.scss'
import Loader from '@/components/Loader'

interface ButtonProps {
  children: ReactNode
}

const Button = function ({
  children,
  ...props
}: ButtonProps & ComponentPropsWithRef<'button'>) {
  const { pending } = useFormStatus()
  return (
    <button className="auth-btn" disabled={pending} {...props}>
      {children}
      {pending && <Loader radii={25} ringWidth={3} ringColor="#613db7" />}
    </button>
  )
}

export default Button
