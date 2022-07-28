import React, { useMemo, useEffect } from 'react'
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
import { dateMask } from 'helpers'
import styled from 'styled-components'

const UserForm = () => {
  const { handleOpenModal, handleCloseModal } = useModal()
  const { userRoles, isLoadingRoles } = useUser()

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

  const { isFetching: isLoadingUser, data: user } = useQuery(['userById', id], getUserById, {
    enabled: !!id
  })

  useEffect(() => {
    reset({
      name: user?.name || '',
      email: user?.email || '',
      role_id: user?.role?.id || '',
      birthdate: user?.birthdate || ''
    })
  }, [user, reset])

  const isLoading = useMemo(() => isLoadingRoles || isLoadingUser, [isLoadingRoles, isLoadingUser])

  const onSubmit = async ({ confirmPassword, ...values }) => {
    try {
      id ? await updateUser(id, values) : await createUser(values)
      handleOpenModal({
        type: 'success',
        content: id ? 'Usuário atualizado com sucesso' : 'Usuário criado com sucesso',
        onClose: () => history.goBack()
      })
    } catch (err) {
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
      {!!id && (
        <Row width='100%' justifyContent='flex-end'>
          <Button
            backgroundColor='red'
            type='button'
            fontWeight='bold'
            onClick={() =>
              handleOpenModal({
                type: 'confirmation',
                title: 'Atenção',
                content: 'Tem certeza de que deseja excluir o usuário?',
                onConfirm: handleDeleteUser
              })
            }
          >
            Excluir
          </Button>
        </Row>
      )}
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
            name='role'
            ref={register}
            placeholder='Cargo'
            error={errors?.role?.message}
            type='text'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='Idade'
            name='age'
            ref={register}
            placeholder='Idade'
            error={errors?.age?.message}
            type='number'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='Tempo de empresa'
            name='workingPeriod'
            ref={register}
            placeholder='Tempo de empresa'
            error={errors?.workingPeriod?.message}
            type='number'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='Projetos que participou'
            name='projects'
            ref={register}
            placeholder='Projetos que participou'
            error={errors?.projects?.message}
            type='text'
          />
          <Input
            width='100%'
            maxWidth={280}
            label='URL da foto do Naver'
            name='photoUrl'
            ref={register}
            placeholder='URL da foto do Naver'
            error={errors?.photoUrl?.message}
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
          Salvar
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
