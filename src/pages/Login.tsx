import React, { useContext, useState } from 'react'
import { isNotEmpty, useForm } from '@mantine/form';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { AppContext } from '../App';

const Login = () => {
  const { setLoading } = useContext(AppContext)
  const [isLogging, setIsLogging] = useState<boolean>(false)

  const form = useForm({
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
    setIsLogging(true)
    setLoading(true)
    // null check
    const values = form.getValues()
    if (!values.email || !values.password) {
      return alert('Please Complete User Information')
    }
    // call firebase
    await signInWithEmailAndPassword(
      auth,
      form.getValues().email,
      form.getValues().password
    ).catch((err): void => {
      console.warn(err)
      setLoading(false)
      setIsLogging(false)
      alert('Incorrect Credentials')
    })
    setIsLogging(false)
    setLoading(false)
  }

  return (
    <div>
      <div className='text-center max-w-64 m-auto mt-32 grid gap-3'>
        <h1>258 CRM Console</h1>
        <TextInput
          style={{ '--input-bd-focus': '#f06' }}
          {...form.getInputProps('email')}
          key={form.key('email')}
          // label="Email"
          placeholder="Email"
        />
        <PasswordInput
          {...form.getInputProps('password')}
          key={form.key('password')}
          // label="Password"
          placeholder="Password"
          onKeyDown={onEnterKeyDown}
        />
        <Button onClick={firebaseLogin} mt="md" color='teal'>
          Login
        </Button>
      </div>
    </div>
  )
}

export default Login