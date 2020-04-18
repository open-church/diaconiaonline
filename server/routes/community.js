
import express from 'express'

import { getCommunity, createCommunity, updateCommunity, updatePassword } from '../controllers/community'

const router = express.Router()

router.get('/:id', getCommunity)
router.post('/', createCommunity)
router.put('/', updateCommunity)
router.put('/password', updatePassword)

export default router
