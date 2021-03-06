
import express from 'express'

import { checkSession } from '../controllers/auth'
import { getCommunity, getMembers, createCommunity, removeCommunity, updateCommunity, updatePassword, resetPassword } from '../controllers/community'

const router = express.Router()

router.get('/', checkSession, getCommunity)
router.get('/members', checkSession, getMembers)
router.post('/', createCommunity)
router.put('/', checkSession, updateCommunity)
router.put('/password', checkSession, updatePassword)
router.put('/password/reset', resetPassword)
router.delete('/', checkSession, removeCommunity)

export default router
