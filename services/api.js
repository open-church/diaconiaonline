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
  setHeader (token) {
    api.defaults.headers.common = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  async login (user) {
    return api.post('/auth', user).then(response => response).catch(error => error)
  }

  async createCommunity (community) {
    return api.post('/community', community).then(response => response).catch(error => error)
  }

  async createPeople (people) {
    return api.post('/people', people).then(response => response).catch(error => error)
  }

  async updateCommunity (community) {
    const credentials = getCredentials()
    this.setHeader(credentials.token)
    return api.put('/community', community).then(response => response).catch(error => error)
  }

  async updatePeople (people) {
    const credentials = getCredentials()
    this.setHeader(credentials.token)
    return api.put('/people', people).then(response => response).catch(error => error)
  }

  async getCommunity () {
    const credentials = getCredentials()
    this.setHeader(credentials.token)
    return api.get('/community').then(response => response).catch(error => error)
  }

  async getMyMembers () {
    const credentials = getCredentials()
    this.setHeader(credentials.token)
    return api.get('/community/members').then(response => response).catch(error => error)
  }

  async getPeople () {
    const credentials = getCredentials()
    this.setHeader(credentials.token)
    return api.get('/people').then(response => response).catch(error => error)
  }

  async getAddressByZipCode (zipCode) {
    return api.get(`/utils/cep/${zipCode}`).then(response => response).catch(error => error)
  }

  async getOccupations () {
    return api.get('/utils/occupations').then(response => response).catch(error => error)
  }

  async getCommunityRelations () {
    return api.get('/utils/community-relations').then(response => response).catch(error => error)
  }

  async forgotCommunityPassword (data) {
    return api.put('/community/password/reset', data).then(response => response).catch(error => error)
  }

  async forgotPeoplePassword (data) {
    return api.put('/people/password/reset', data).then(response => response).catch(error => error)
  }
}

export default new Api()
