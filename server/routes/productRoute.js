import express from 'express'
import { brainTreePaymentController, braintreeTokenController, createProductController, deleteProductController, getProductController, singleProductController, updateProductController } from '../controllers/productController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'


// router object
const router = express.Router()

// routing
router.post('/add-product', requireSignIn, isAdmin,  createProductController)

router.put('/update-product/:pid', requireSignIn, isAdmin, updateProductController)

router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController)

router.get('/products', getProductController)

router.get('/product/:_id', singleProductController)

//token
router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);

export default router