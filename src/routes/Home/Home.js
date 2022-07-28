import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'

import Column from 'components/Column'
import Text from 'components/Text'

import Row from 'components/Row'
import Image from 'components/Image'

import naver1 from 'assets/naver1.png'
import naver2 from 'assets/naver2.png'
import naver3 from 'assets/naver3.png'
import naver4 from 'assets/naver4.png'
import editIcon from 'assets/icons/edit.png'
import deleteIcon from 'assets/icons/delete.png'
import Button from 'components/Button'
import ModalDelete from './ModalDelete'
import ModalNaverDetails from './ModalNaverDetails'

const naversList = [
  {
    img: naver1,
    name: 'Juliano Reis',
    role: 'Front-end Developer'
  },
  {
    img: naver2,
    name: 'Gabriel do Couto',
    role: 'Front-end Developer'
  },
  {
    img: naver3,
    name: 'Eduardo Bittencourt',
    role: 'Front-end Developer'
  },
  {
    img: naver4,
    name: 'Gustavo Pinho',
    role: 'Technology Manager'
  }
]

const Home = () => {
  const history = useHistory()
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [isNaverDetailsModalOpened, setIsNaverDetailsModalOpened] = useState(false)

  const onCloseHandler = () => {
    setIsDeleteModalOpened(false)
    setIsNaverDetailsModalOpened(false)
  }

  return (
    <Fragment>
      <Column marginTop={40}>
        <Row as='div' justifyContent='space-between'>
          <Text fontSize={40} fontWeight={600}>
            Navers
          </Text>
          <Button onClick={() => history.push('/usuarios/criar')} fontWeight='600' cursor='pointer'>
            Adicionar Naver
          </Button>
        </Row>
        <Row as='ul' flexWrap='wrap' justifyContent='space-between' marginTop={32}>
          {naversList.map((item, index) => {
            return (
              <NaversItem key={index}>
                <Image src={item.img} alt={item.name} onClick={() => setIsNaverDetailsModalOpened(true)} />
                <div>
                  <Text fontWeight={600}>{item.name}</Text>
                  <Text>{item.role}</Text>
                </div>
                <ControllersContainer>
                  <Image onClick={() => history.push('/usuarios/123')} src={editIcon} alt={'Edit'} />
                  <Image onClick={() => setIsDeleteModalOpened(true)} src={deleteIcon} alt={'Delete'} />
                </ControllersContainer>
              </NaversItem>
            )
          })}
        </Row>
      </Column>
      <ModalDelete isOpen={isDeleteModalOpened} onClose={onCloseHandler} />
      <ModalNaverDetails isOpen={isNaverDetailsModalOpened} onClose={onCloseHandler} />
    </Fragment>
  )
}

const NaversItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 16px;

  img {
    cursor: pointer;
  }
`

const ControllersContainer = styled(Row)`
  gap: 16px;
`

export default Home
