
import express from 'express'

import { checkSession } from '../controllers/auth'
import { getPeople, createPeople, removePeople, updatePeople, updatePassword, resetPassword } from '../controllers/people'

const router = express.Router()

router.get('/', checkSession, getPeople)
router.post('/', createPeople)
router.put('/', checkSession, updatePeople)
router.put('/password', checkSession, updatePassword)
router.put('/password/reset', resetPassword)
router.delete('/', checkSession, removePeople)

export default router
