
import express from 'express'

import authRoutes from './auth'
import communityRoutes from './community'

const router = express.Router()

router.use('/community', communityRoutes)
router.use('/auth', authRoutes)

export default router
