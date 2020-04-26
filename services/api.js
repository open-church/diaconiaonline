import axios from 'axios'

import { logout } from '../helpers/auth'
const { API_URL } = process.env

const api = axios.create({
  baseURL: API_URL
})

api.interceptors.response.use(response => response,
  error => {
    if (error.response.status === 401) logout('/?token=not-authorized')
    return Promise.reject(error.response)
  }
)

class Api {
  setHeader (token, visitParams) {
    api.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  async login (user) {
    try {
      return await api.post('/auth', user)
    } catch (error) {
      return error
    }
  }
}

export default new Api()
