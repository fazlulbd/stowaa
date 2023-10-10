import slugify from "slugify"
import bannerModel from "../models/bannerModel.js"

export const createBannerController = async (req, res)=>{
    try{
        const {name, slug, title, subtitle, price, button, image} =  req.body
        switch(true){
            case !name: 
                return res.status(401).send({error: "Name is required"})
            case !title: 
                return res.status(401).send({error: "title is required"})
            case !subtitle: 
                return res.status(401).send({error: "subtitle is required"})
            case !price: 
                return res.status(401).send({error: "subtitle is required"})
            case !button: 
                return res.status(401).send({error: "subtitle is required"})
            case !image: 
                return res.status(401).send({error: "image is required"})          
        }
        const banners =  await new bannerModel({...req.body, slug:slugify(name)}).save()       
        res.status(201).send({
            success: true,
            message: "banner created Successfully",
            banners
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






export const getBannerController = async (req, res)=>{
    try{
        const banners = await bannerModel.find({})
       
        res.status(200).send({
            success:true,
            message: "all banners",
            totalbanner:banners.length,
            banners
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