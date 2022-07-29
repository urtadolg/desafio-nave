import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'

import { useUser } from 'context/user-context'

import { loginResolver } from 'helpers/yup-schemas'
import Image from 'components/Image'
import Loader from 'components/Loader'
import { setAccessToken } from 'helpers'
import Text from 'components/Text'

const Login = () => {
  //const { login, isLoggingIn } = useUser()
  const queryClient = useQueryClient()

  const onLoginHandler = async data => {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}v1/users/login`, {
      email: data.email,
      password: data.password
    })

    //localStorage.setItem('userToken', result.data.token)
    setAccessToken(result.data.token)
    queryClient.setQueryData('user', result.data)
  }

  const { isLoading: isLoggingIn, isError, error, data, isSuccess, mutate } = useMutation(data => onLoginHandler(data))

  const { register, handleSubmit, errors, formState } = useForm({ resolver: loginResolver })

  return (
    <Column height='100vh' width='100vw' justifyContent='center' alignItems='center'>
      <Column
        border='1px solid #212121'
        as='form'
        onSubmit={handleSubmit(data => mutate(data))}
        px={32}
        py={40}
        alignItems='center'
        width='448px'
        height='408px'
      >
        <Image src='/logo.jpg' width={235.34} height={60} mb={40} />
        <Input
          name='email'
          ref={register}
          label='E-mail'
          placeholder='example@example.com'
          error={errors.email?.message}
          width='100%'
        />
        <Input
          name='password'
          ref={register}
          label='Senha'
          placeholder='******'
          error={errors.password?.message}
          type='password'
          width='100%'
        />
        <Button width='100%' minHeight={30} bg='purple' isLoading={formState.isSubmitting}>
          {isLoggingIn ? <Loader /> : 'Entrar'}
        </Button>
      </Column>
    </Column>
  )
}

export default Login
