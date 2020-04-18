
import express from 'express'

import { login } from '../controllers/auth'

const router = express.Router()

router.post('/auth', login)

export default router
