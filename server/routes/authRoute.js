import express from 'express'
import { forgotPasswordController, loginController, registerController, updateProfileController } from '../controllers/authController.js'
import { requireSignIn } from '../middlewares/authMiddleware.js'


// router object
const router = express.Router()

// routing
router.post('/register', registerController)

router.post('/login', loginController)

router.post('/forgot-password', forgotPasswordController)

//update profile
router.put("/profile", requireSignIn, updateProfileController);

export default router
