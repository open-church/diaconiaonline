import axios from 'axios'

import { logout, getCredentials } from '../helpers/auth'
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

  async createCommunity (community) {
    try {
      return await api.post('/community', community)
    } catch (error) {
      return error
    }
  }

  async createPeople (community) {
    try {
      return await api.post('/people', community)
    } catch (error) {
      return error
    }
  }

  async updateCommunity (community) {
    try {
      const credentials = getCredentials()
      this.setHeader(credentials.token)
      return await api.put('/community', community)
    } catch (error) {
      return error
    }
  }

  async updatePeople (people) {
    try {
      const credentials = getCredentials()
      this.setHeader(credentials.token)
      return await api.put('/people', people)
    } catch (error) {
      return error
    }
  }

  async getCommunity () {
    try {
      const credentials = getCredentials()
      this.setHeader(credentials.token)
      return await api.get('/community')
    } catch (error) {
      return error
    }
  }

  async getPeople () {
    try {
      const credentials = getCredentials()
      this.setHeader(credentials.token)
      return await api.get('/people')
    } catch (error) {
      return error
    }
  }

  async getAddressByZipCode (zipCode) {
    try {
      return await api.get(`/utils/cep/${zipCode}`)
    } catch (error) {
      return error
    }
  }
}

export default new Api()
