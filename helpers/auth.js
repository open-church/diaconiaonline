import cookie from 'js-cookie'
import Router from 'next/router'

import { getCookies, setCookies } from '../services/cookies'

const AUTH_KEY = 'DO_CREDENTIALS'

export const saveCredentials = async ({ token, email }) => {
  if (!token) {
    const credentials = JSON.parse(getCookies(AUTH_KEY))
    token = credentials.token
  }
  setCookies(AUTH_KEY, {
    token,
    email
  })
}

export const getCredentials = () => {
  const credentials = getCookies(AUTH_KEY)
  return credentials ? JSON.parse(credentials) : null
}

export const logout = (url) => {
  cookie.remove(AUTH_KEY)
  Router.push(url || '/')
}
