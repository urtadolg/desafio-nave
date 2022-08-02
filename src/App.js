import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'

import { createGlobalStyle } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import { ModalProvider } from 'context/modal-context'
import Helmet from 'react-helmet'

import Loader from 'components/Loader'

import { useUser } from 'context/user-context'
import { apolloClient } from 'providers'

import Theme from 'theme'

import 'sanitize.css/sanitize.css'

const AuthenticatedApp = lazy(() => import('./AuthenticatedApp'))
const UnauthenticatedApp = lazy(() => import('./UnauthenticatedApp'))

const GlobalStyle = createGlobalStyle`
* {
  border: 0;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  outline: none;
  font-family: 'Montserrat', sans-serif;
  list-style: none;
}

button, a {
  cursor: pointer;
  &:disabled{
    cursor: not-allowed;
  }
}
`

const App = () => {
  const { user, isLoading } = useUser()

  if (isLoading) {
    return <Loader />
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Theme>
        <ModalProvider>
          <Helmet titleTemplate='Nave.rs | %s' />
          <GlobalStyle />
          <Suspense fallback={<Loader />}>
            <Router>{/* user */ true ? <AuthenticatedApp /> : <UnauthenticatedApp />}</Router>
          </Suspense>
          <ReactQueryDevtools />
        </ModalProvider>
      </Theme>
    </ApolloProvider>
  )
}

export default App
