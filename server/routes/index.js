
import express from 'express'

import authRoutes from './auth'
import communityRoutes from './community'
import peopleRoutes from './people'
import utilsRoutes from './utils'

const router = express.Router()

router.use('/community', communityRoutes)
router.use('/people', peopleRoutes)
router.use('/auth', authRoutes)
router.use('/utils', utilsRoutes)

export default router
