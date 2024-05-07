'use client'
import { ComponentPropsWithoutRef, useState } from 'react'
import '../sass/components/input.scss'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

interface InputProps {
  htmlFor: string
  label: string
  formState: {
    path: string
    message: string
  }
}

const Input = function ({
  htmlFor,
  label,
  formState,
  ...inputProps
}: InputProps & ComponentPropsWithoutRef<'input'>) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <label
      className={`input ${formState?.path[0] === htmlFor ? 'invalid' : ''}`}
      htmlFor={htmlFor}
    >
      {label}
      <input
        {...inputProps}
        name={htmlFor}
        required
        type={isPasswordVisible ? 'text' : inputProps.type}
      />
      {inputProps.type === 'password' ? (
        isPasswordVisible ? (
          <EyeIcon
            onClick={() => setIsPasswordVisible(prev => !prev)}
            color="#909195"
          />
        ) : (
          <EyeOffIcon
            onClick={() => setIsPasswordVisible(prev => !prev)}
            color="#909195"
          />
        )
      ) : null}
      <p className="input__error">{formState?.message}</p>
    </label>
  )
}

export default Input
