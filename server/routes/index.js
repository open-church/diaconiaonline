
import express from 'express'

import communityRoutes from './community'

const router = express.Router()

router.use('/community', communityRoutes)

export default router
