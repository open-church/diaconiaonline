import cepService from 'cep-promise'

import { communityRelations, occupations } from '../helpers/enums'

export const getCommunityRelations = (req, res) => res.json(communityRelations)

export const getOccupations = (req, res) => res.json(occupations)

export const getAddressByCep = async (req, res) => {
  try {
    const { cep } = req.params
    const address = await cepService(cep)
    res.json(address)
  } catch (e) {
    res.status(400).json({ message: 'CEP inválido' })
  }
}
