import React, { useState, useEffect, createContext } from 'react'

import BootstrapProvider from '@bootstrap-styled/provider'
import cookie from 'js-cookie'
import Head from 'next/head'
import Router from 'next/router'
import PropTypes from 'prop-types'

import { GlobalStyle } from '../styles/globalStyle'
import { colors } from '../utils/variables'

export const SessionContext = createContext()

const MyApp = ({ Component, pageProps }) => {
  const [session, setSession] = useState()
  const [token, setToken] = useState()

  const cookieToken = cookie.get('token')

  useEffect(() => {
    if (cookieToken) setToken(cookieToken)
  }, [])

  const login = ({ email, token, entity }) => {
    console.log('email', email)
    console.log('token', token)
    console.log('entity', entity)

    cookie.set('token', token, { expires: 14 })
    setSession({ email, entity })
    setToken(token)
  }

  const logout = () => {
    setSession(null)
    cookie.remove(token)
    Router.push('/')
  }

  return (
    <>
      <SessionContext.Provider value={{
        session: session,
        token: cookieToken || token,
        login: login,
        logout: logout,
        setSession: setSession
      }}>
        <Head>
          <title>Diaconia.online</title>
        </Head>
        <BootstrapProvider theme={{
          '$btn-primary-bg': `${colors.blueZodiac}`,
          '$btn-primary-color': `${colors.white}`,
          '$btn-primary-border': `${colors.white}`,
          '$btn-secondary-bg': `${colors.white}`,
          '$btn-secondary-color': `${colors.blueZodiac}`,
          '$btn-secondary-border': `${colors.blueZodiac}`,
          '$btn-info-color': `${colors.white}`,
          '$btn-info-bg': `${colors.burningOrange}`,
          '$btn-info-border': `${colors.burningOrange}`,
          '$btn-danger-color': `${colors.burningOrange}`,
          '$btn-danger-bg': `${colors.white}`,
          '$btn-danger-border': `${colors.burningOrange}`
        }}>
          <GlobalStyle />
          <Component {...pageProps} />
        </BootstrapProvider>
      </SessionContext.Provider>
    </>
  )
}

MyApp.propTypes = {
  // Component: PropTypes.element,
  pageProps: PropTypes.object
}

export default MyApp
