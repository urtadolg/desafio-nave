import React, { useMemo, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useParams, useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'

import Text from 'components/Text'
import Column from 'components/Column'
import Input from 'components/Input'
import Button from 'components/Button'
import Row from 'components/Row'
import Loader from 'components/Loader'
import Select from 'components/Select'
import Image from 'components/Image'
import prevIcon from 'assets/icons/prev.png'

import { userFormResolver } from 'helpers/yup-schemas'
import { getUserById, updateUser, createUser, deleteUser } from 'services/users'
import { useModal } from 'context/modal-context'
import { useUser } from 'context/user-context'
import { dateMask, formatDateFromApi, formatDateToApi } from 'helpers'
import styled from 'styled-components'

const UserForm = () => {
  const { handleOpenModal, handleCloseModal } = useModal()
  const { userRoles, isLoadingRoles } = useUser()
  const [isLoadingRequest, setIsLoadingRequest] = useState(false)

  const {
    handleSubmit,
    register,
    errors,
    reset,
    control,
    formState: { isSubmitting }
  } = useForm({
    resolver: userFormResolver
  })

  const { id } = useParams()
  const history = useHistory()

  const { isFetching: isLoadingUser, data: user } = useQuery(['naver', id], getUserById, {
    enabled: !!id
  })

  useEffect(() => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
      job_role: user?.job_role || '',
      project: user?.project || '',
      url: user?.url || '',
      birthdate: user?.birthdate || '',
      admission_date: user?.admission_date || ''
    })
  }, [user, reset])

  const isLoading = useMemo(() => isLoadingRoles || isLoadingUser, [isLoadingRoles, isLoadingUser])

  const onSubmit = async ({ ...values }) => {
    try {
      setIsLoadingRequest(true)
      id ? await updateUser(id, values) : await createUser(values)
      setIsLoadingRequest(false)
      handleOpenModal({
        type: 'success',
        content: id ? 'Usu??rio atualizado com sucesso' : 'Usu??rio criado com sucesso',
        onClose: () => history.goBack()
      })
    } catch (err) {
      setIsLoadingRequest(false)
      handleOpenModal({ type: 'error' })
    }
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id)
      handleCloseModal()
      history.goBack()
    } catch (err) {
      handleCloseModal()
      handleOpenModal({ type: 'error' })
    }
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <Column alignItems='center'>
      <Column
        as='form'
        width='100%'
        maxWidth='592px'
        borderRadius={5}
        onSubmit={handleSubmit(onSubmit)}
        position='relative'
      >
        <Row alignItems='center' mb={32}>
          <PrevButton
            onClick={() => history.goBack()}
            src={prevIcon}
            minWidth='fit-content'
            height='fit-content'
            mr={22.5}
          />
          <Text fontWeight='bold' fontSize={24} textAlign='center'>
            {id ? 'Editar Naver' : 'Adicionar Naver'}
          </Text>
        </Row>
        <Row flexWrap='wrap' justifyContent='space-between'>
          <Input
            width='100%'
            maxWidth={280}
            label='Nome'
            name='name'
            ref={register}
            placeholder='Nome'
            error={errors?.name?.message}
            type='text'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='Cargo'
            name='job_role'
            ref={register}
            placeholder='Cargo'
            error={errors?.job_role?.message}
            type='text'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='Data de nascimento'
            name='birthdate'
            ref={register}
            placeholder='Data de nascimento'
            error={errors?.birthdate?.message}
            type='date'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='Data de admiss??o'
            name='admission_date'
            ref={register}
            placeholder='Data de admiss??o'
            error={errors?.admission_date?.message}
            type='date'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='Projetos que participou'
            name='project'
            ref={register}
            placeholder='Projetos que participou'
            error={errors?.project?.message}
            type='text'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='URL da foto do Naver'
            name='url'
            ref={register}
            placeholder='URL da foto do Naver'
            error={errors?.url?.message}
            type='text'
          />
        </Row>
        <SubmitButton
          width={['100%', 'regular']}
          backgroundColor='primary.main'
          fontWeight='bold'
          type='submit'
          disabled={isSubmitting}
          mt={20}
        >
          {isLoadingRequest ? <Loader /> : 'Salvar'}
        </SubmitButton>
      </Column>
    </Column>
  )
}

const PrevButton = styled(Image)`
  cursor: pointer;
`

const SubmitButton = styled(Button)`
  align-self: flex-end;
`

export default UserForm
