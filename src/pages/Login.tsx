import React, { useState } from 'react'
import { isNotEmpty, useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Login = () => {
  const [isLogging, setIsLogging] = useState<boolean>(false)

  // mantine's form object
  const loginForm = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isNotEmpty('Email cannot be empty'),
      password: isNotEmpty('Password cannot be empty')
    }
  });

  const onEnterKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      firebaseLogin()
    }
  }

  const firebaseLogin = async () => {
    if (isLogging) return
    // null check
    const values = loginForm.getValues()
    if (!values.email || !values.password) return alert('Please Complete User Information')
    setIsLogging(true)
    // call firebase
    await signInWithEmailAndPassword(
      auth,
      loginForm.getValues().email,
      loginForm.getValues().password
    ).catch((err): void => {
      console.warn(err)
      setIsLogging(false)
      alert('Incorrect Credentials')
    })
    setIsLogging(false)
  }

  return (
    <div className='w-screen'>
      <div className='text-center max-w-64 m-auto mt-32 grid gap-3'>
        <h1>258 CRM Console</h1>
        <TextInput
          style={{ '--input-bd-focus': '#f06' }}
          {...loginForm.getInputProps('email')}
          key={loginForm.key('email')}
          // label="Email"
          placeholder="Email"
        />
        <PasswordInput
          {...loginForm.getInputProps('password')}
          key={loginForm.key('password')}
          // label="Password"
          placeholder="Password"
          onKeyDown={onEnterKeyDown}
        />
        <Button
          onClick={firebaseLogin}
          mt="md"
          // color='teal'
          loaderProps={{ type: 'dots' }}
          loading={isLogging}
          variant="gradient"
          gradient={{ from: 'teal', to: 'cyan', deg: 144 }}
        >
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login