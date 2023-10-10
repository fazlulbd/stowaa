import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategorController } from '../controllers/categoryController.js'

// router object
const router = express.Router()

// routing
router.post('/add-category', requireSignIn, isAdmin, createCategoryController)

router.put('/update-category/:cid', requireSignIn, isAdmin, updateCategorController)

router.delete('/delete-category/:cid', requireSignIn, isAdmin, deleteCategoryController)

router.get('/category', categoryController)

router.get('/category/:slug', singleCategoryController)

export default router