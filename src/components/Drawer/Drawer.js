import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import Image from 'components/Image'
import Button from 'components/Button'
import { useUser } from 'context/user-context'

const NAV_BAR_HEIGHT = 60
const SIDE_BAR_WIDTH = 200
const ROUTES = [
  {
    path: '/usuarios',
    label: 'Usuários'
  },
  {
    path: '/usuarios/criar',
    label: 'Criar usuário'
  }
]

const DrawerComponent = ({ children }) => {
  const { logout } = useUser()

  const history = useHistory()

  return (
    <Container>
      <NavBar>
        <Logo onClick={() => history.push('/home')} width={145.12} height={37} src={'/logo.jpg'} />
        <Button p={0} width='fit-content' fontWeight='600' backgroundColor='white' color='black' onClick={logout}>
          Sair
        </Button>
      </NavBar>
      <Content>{children}</Content>
    </Container>
  )
}

const Logo = styled(Image)`
  cursor: pointer;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`

const Content = styled.div`
  padding: 20px 32px;
  padding-top: ${NAV_BAR_HEIGHT + 20}px;
  height: 100vh;
  width: 100vw;
  max-width: 1280px;
  overflow: auto;
  background-color: white;
  transition: all 0.3s ease-in-out;
`

const Link = styled(RouterLink)`
  color: black;
  text-decoration: none;
`

const NavBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${NAV_BAR_HEIGHT}px;
  width: 100%;
  max-width: 1280px;
  height: 85px;
  z-index: 0;
  padding: 24px 32px;
  background-color: white;
`

const BurgerMenu = styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`

const SideBar = styled.div`
  ${({ isOpen, theme }) => css`
    position: absolute;
    height: 100%;
    background-color: white;
    border-right: 1px solid lightgray;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.3s ease-in-out;
    display: flex;
    flex-direction: column;
    ${isOpen
      ? css`
          width: ${SIDE_BAR_WIDTH}px;
          padding: 20px;
          padding-top: ${NAV_BAR_HEIGHT + 20}px;
        `
      : css`
          width: 0px;
        `};
  `}
`

export default DrawerComponent
