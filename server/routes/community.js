
import express from 'express'

import { checkSession } from '../controllers/auth'
import { getCommunity, createCommunity, removeCommunity, updateCommunity, updatePassword } from '../controllers/community'

const router = express.Router()

router.get('/', checkSession, getCommunity)
router.post('/', createCommunity)
router.put('/', checkSession, updateCommunity)
router.put('/password', checkSession, updatePassword)
router.delete('/', checkSession, removeCommunity)

export default router
