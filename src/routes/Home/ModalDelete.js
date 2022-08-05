import Button from 'components/Button'
import Column from 'components/Column'
import Modal from 'components/Modal'
import Row from 'components/Row'
import Text from 'components/Text'
import React from 'react'

const ModalDelete = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} borderRadius={0} padding={32} width={592} height={233}>
      <Column height='100%' justifyContent='space-between'>
        <Text variant='big' fontWeight={600}>
          Excluir Naver
        </Text>
        <Text>Tem certeza que deseja excluir este Naver?</Text>
        <Row justifyContent='flex-end'>
          <Button
            onClick={onClose}
            border='1px solid #212121'
            backgroundColor='white'
            color='#212121'
            fontWeight={600}
            mr={24}
          >
            Cancelar
          </Button>
          <Button fontWeight={600}>Excluir</Button>
        </Row>
      </Column>
    </Modal>
  )
}

export default ModalDelete
