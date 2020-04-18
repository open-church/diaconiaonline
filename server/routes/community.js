
import express from 'express'

import { getCommunity, createCommunity, removeCommunity, updateCommunity, updatePassword } from '../controllers/community'

const router = express.Router()

router.get('/:id', getCommunity)
router.post('/', createCommunity)
router.put('/', updateCommunity)
router.put('/password', updatePassword)
router.delete('/:id', removeCommunity)

export default router
