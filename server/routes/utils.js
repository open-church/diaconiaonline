import express from 'express'

import { getOccupations, getCommunityRelations, getAddressByCep } from '../controllers/utils'

const router = express.Router()

router.get('/community-relations', getCommunityRelations)
router.get('/occupations', getOccupations)
router.get('/cep/:cep', getAddressByCep)

export default router
