import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useQuery } from 'react-query'

import Column from 'components/Column'
import Text from 'components/Text'
import Row from 'components/Row'
import Image from 'components/Image'

import naver1 from 'assets/naver1.png'
import naver2 from 'assets/naver2.png'
import naver3 from 'assets/naver3.png'
import naver4 from 'assets/naver4.png'
import Button from 'components/Button'
import ModalDelete from './ModalDelete'
import ModalNaverDetails from './ModalNaverDetails'
import axios from 'axios'
import { getToken } from 'helpers'
import Loader from 'components/Loader'
import Controllers from './Controllers'
import { useModal } from 'context/modal-context'

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

const fetchNavers = async () => {
  const userToken = getToken()

  const response = await axios.get(`${process.env.REACT_APP_API_URL}v1/navers`, {
    headers: { Authorization: `Bearer ${userToken}` }
  })

  return response.data
}

const Home = () => {
  const history = useHistory()
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false)
  const [isNaverDetailsModalOpened, setIsNaverDetailsModalOpened] = useState(false)

  const { isLoading, isError, data } = useQuery('navers', fetchNavers)

  const onCloseHandler = () => {
    setIsDeleteModalOpened(false)
    setIsNaverDetailsModalOpened(false)
  }

  const modalContext = useModal()

  return (
    <Fragment>
      <ModalDelete isOpen={!!isDeleteModalOpened} onClose={onCloseHandler} naverId={isNaverDetailsModalOpened} />
      <ModalNaverDetails
        isOpen={!!isNaverDetailsModalOpened}
        onClose={onCloseHandler}
        naverId={isNaverDetailsModalOpened}
      />
      <Column marginTop={40}>
        <Row as='div' justifyContent='space-between'>
          <Text fontSize={40} fontWeight={600}>
            Navers
          </Text>
          <Button onClick={() => history.push('/usuarios/criar')} fontWeight='600' cursor='pointer'>
            Adicionar Naver
          </Button>
        </Row>
        <NaversList as='ul' flexWrap='wrap' justifyContent='flex-start'>
          {isLoading ? (
            <Loader />
          ) : (
            data.map((item, index) => {
              return (
                <NaversItem key={index}>
                  <Image src={naver1} alt={item.name} onClick={() => setIsNaverDetailsModalOpened(item.id)} />
                  <div>
                    <Text fontWeight={600}>{item.name}</Text>
                    <Text>{item.job_role}</Text>
                  </div>
                  <Controllers
                    onEdit={() => history.push(`/navers/${item.id}`)}
                    onDelete={() =>
                      modalContext.handleOpenModal({
                        type: 'confirmation',
                        title: 'Excluir Naver',
                        content: 'Tem certeza que deseja excluir este Naver?',
                        closeTitle: 'Cancelar',
                        onConfirm: async () => {
                          const userToken = getToken()
                          const response = await axios.delete(`${process.env.REACT_APP_API_URL}v1/navers/${item.id}`, {
                            headers: { Authorization: `Bearer ${userToken}` }
                          })
                          history.push('/')
                        }
                      })
                    }
                  />
                </NaversItem>
              )
            })
          )}
        </NaversList>
      </Column>
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

const NaversList = styled(Row)`
  gap: 32px;
`

export default Home
