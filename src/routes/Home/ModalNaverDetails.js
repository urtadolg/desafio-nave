import Button from 'components/Button'
import Column from 'components/Column'
import Image from 'components/Image'
import Modal from 'components/Modal'
import Row from 'components/Row'
import Text from 'components/Text'
import React from 'react'
import styled from 'styled-components'
import naverImg from 'assets/naver1.png'
import closeIcon from 'assets/icons/close.png'
import { useModal } from 'context/modal-context'
import Controllers from './Controllers'
import { formatDateFromApi, formatDateToApi, getToken } from 'helpers'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'

const fetchNaverData = async naverId => {
  if (!naverId) return

  const userToken = getToken()

  const response = await axios.get(`${process.env.REACT_APP_API_URL}v1/navers/${naverId}`, {
    headers: { Authorization: `Bearer ${userToken}` }
  })

  return response.data
}

const ModalNaverDetails = ({ isOpen, onClose, naverId }) => {
  const modalContext = useModal()
  const history = useHistory()

  const onDeleteButtonHandler = () => {
    modalContext.handleOpenModal({
      type: 'confirmation',
      title: 'Excluir Naver',
      content: 'Tem certeza que deseja excluir este Naver?',
      closeTitle: 'Cancelar',
      onConfirm: async () => {
        const userToken = getToken()
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}v1/navers/${naverId}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        })
        history.push('/')
      }
    })
    onClose()
  }

  const { isLoading, isError, data } = useQuery(['naver', naverId], () => fetchNaverData(naverId))

  return (
    <Modal isOpen={isOpen} onClose={onClose} borderRadius={0} width={1006} height={503} padding={0}>
      <Row height='100%' justifyContent='space-between' position='relative'>
        <Image src={naverImg} alt={'Naver Name'} width={503} height={503} />
        {!isLoading && data && (
          <Column width='100%' height='100%' padding={32}>
            <CloseButton onClick={onClose} style={{ cursor: 'pointer' }} src={closeIcon} width={14} height={14} />
            <Text variant={'big'} fontWeight={600} marginBottom={6}>
              {data.name}
            </Text>
            <Text variant={'regular'} marginBottom={24}>
              {data.job_role}
            </Text>
            <Text variant={'regular'} fontWeight={600} marginBottom={6}>
              Idade
            </Text>
            <Text variant={'regular'} marginBottom={24}>
              {formatDateFromApi(data.birthdate)}
            </Text>
            <Text variant={'regular'} fontWeight={600} marginBottom={6}>
              Tempo de empresa
            </Text>
            <Text variant={'regular'} marginBottom={24}>
              {formatDateFromApi(data.admission_date)}
            </Text>
            <Text variant={'regular'} fontWeight={600} marginBottom={6}>
              Projetos que participou
            </Text>
            <Text variant={'regular'}>{data.project}</Text>
            <Column height='100%' justifyContent='flex-end'>
              <Controllers onEdit={() => history.push(`/navers/${naverId}`)} onDelete={onDeleteButtonHandler} />
            </Column>
          </Column>
        )}
      </Row>
    </Modal>
  )
}

const CloseButton = styled(Image)`
  position: absolute;
  right: 21px;
  top: 21px;
  z-index: 10;
`

export default ModalNaverDetails
