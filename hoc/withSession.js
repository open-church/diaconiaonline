import React, { useEffect, useState } from 'react'

import cookie from 'js-cookie'
import Router from 'next/router'

import useSession from '../hooks/useSession'

const withSession = WrappedComponent => {
  const Wrapper = props => {
    const { setSession, session } = useSession()
    const [token, setToken] = useState()

    const cookieToken = cookie.get('token')

    useEffect(() => {
      console.log('withSession', session)
      if (cookieToken) {
        setToken(cookieToken)
      } else {
        Router.replace('/')
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}

export default withSession
