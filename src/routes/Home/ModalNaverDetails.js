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

const ModalNaverDetails = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} borderRadius={0} width={1006} height={503} padding={0}>
      <Row height='100%' justifyContent='space-between' position='relative'>
        <Image src={naverImg} alt={'Naver Name'} width={503} height={503} />
        <Column width='100%' height='100%' padding={32}>
          <CloseButton onClick={onClose} cursor='pointer' src={closeIcon} width={14} height={14} />
          <Text variant={'big'} fontWeight={600} marginBottom={6}>
            Nome Naver
          </Text>
          <Text variant={'regular'} marginBottom={24}>
            Front-end developer
          </Text>
          <Text variant={'regular'} fontWeight={600} marginBottom={6}>
            Idade
          </Text>
          <Text variant={'regular'} marginBottom={24}>
            20 anos
          </Text>
          <Text variant={'regular'} fontWeight={600} marginBottom={6}>
            Tempo de empresa
          </Text>
          <Text variant={'regular'} marginBottom={24}>
            2 anos
          </Text>
          <Text variant={'regular'} fontWeight={600} marginBottom={6}>
            Projetos que participou
          </Text>
          <Text variant={'regular'}>Atlas Governance</Text>
          <Row></Row>
        </Column>
      </Row>
    </Modal>
  )
}

const CloseButton = styled(Image)`
  position: absolute;
  right: 21px;
  top: 21px;
`

export default ModalNaverDetails
