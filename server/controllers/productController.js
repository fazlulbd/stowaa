import slugify from "slugify"
import productModel from "../models/productModel.js"
import  braintree from "braintree"
import dotenv from "dotenv"

dotenv.config()
const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey:  process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createProductController = async (req, res)=>{
    try{
        const {name, slug, description, brand, price, category, instock, rating, image, color, size} =  req.body
        switch(true){
            case !name: 
                return res.status(401).send({error: "Name is required"})
            case !description: 
                return res.status(401).send({error: "description is required"})
            case !brand: 
                return res.status(401).send({error: "brand is required"})
            case !price: 
                return res.status(401).send({error: "proice is required"})
            case !category: 
                return res.status(401).send({error: "category is required"})
            case !instock: 
                return res.status(401).send({error: "instock is required"})
            case !rating: 
                return res.status(401).send({error: "rating is required"})
            case !image: 
                return res.status(401).send({error: "image is required"})
            case !color: 
                return res.status(401).send({error: "color is required"})
            case !size: 
                return res.status(401).send({error: "size is required"})
        }
        /* =================== unique name check==========================*/
        const existingProduct = await productModel.findOne({name})
        if(existingProduct){
            return res.status(200).send({
                success: true,
                message: 'product Already Exisits'
            })
        }
         /* =================== unique name check==========================*/
        const products =  await new productModel({...req.body, slug:slugify(name)}).save()       
        res.status(201).send({
            success: true,
            message: "Product created Successfully",
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in crearing product',
            error,
        })
    }
}


export const updateProductController = async (req, res)=>{
    try{
        const {name, slug, description, brand, price, category, instock, rating, image, color, size} =  req.body
        switch(true){
            case !name: 
                return res.status(401).send({error: "Name is required"})
            case !description: 
                return res.status(401).send({error: "description is required"})
            case !brand: 
                return res.status(401).send({error: "brand is required"})
            case !price: 
                return res.status(401).send({error: "proice is required"})
            case !category: 
                return res.status(401).send({error: "category is required"})
            case !instock: 
                return res.status(401).send({error: "instock is required"})
            case !rating: 
                return res.status(401).send({error: "rating is required"})
            case !image: 
                return res.status(401).send({error: "image is required"})
            case !color: 
                return res.status(401).send({error: "color is required"})
            case !size: 
                return res.status(401).send({error: "size is required"})
        }
        const product =  await productModel.findByIdAndUpdate(req.params.pid, {...req.body, slug:slugify(name)}, {new: true})
        res.status(201).send({
            success: true,
            message: "Product update Successfully",
            product
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in update product',
            error,
        })
    }
}


export const deleteProductController = async (req, res)=>{
    try{
        const product = await productModel.findByIdAndDelete(req.params.pid)
        res.status(200).send({
            success: true,
            message: 'product deleted successfully',
            product
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error while delete product',
            error,
        })
    }
}

export const getProductController = async (req, res)=>{
    try{
        const products = await productModel
        .find({})
        .limit(12)
        .sort({createdAt: -1})
        .populate('category')
        res.status(200).send({
            success:true,
            message: "all products",
            totalProduct:products.length,
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in crearing product',
            error,
        })
    }
}

export const singleProductController = async (req, res)=>{
    try{
        const product = await productModel
        .findOne({_id: req.params._id})
        .populate('category')
        res.status(200).send({
            success:true,
            message: "Single product fetched",
            product
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error while geting single product',
            error,
        })
    }
}

//token
export const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send(response);
        }
      });
    } catch (error) {
      console.log(error);
    }
};

 //payment
export const brainTreePaymentController = async (req, res) => {
    try {
      const { nonce, cart } = req.body;
      let total = 0;
      cart.map((i) => {
        total += i.price;
      });
      let newTransaction = gateway.transaction.sale(
        {
          amount: total,
          paymentMethodNonce: nonce,
          options: {
            submitForSettlement: true,
          },
        },
        function (error, result) {
          if (result) {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            }).save();
            res.json({ ok: true });
          } else {
            res.status(500).send(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
};