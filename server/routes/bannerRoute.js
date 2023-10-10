import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createBannerController, getBannerController } from '../controllers/bannerController.js'


// router object
const router = express.Router()

// routing
router.post('/add-banner', requireSignIn, isAdmin,  createBannerController)
router.get('/banner', getBannerController)

export default router