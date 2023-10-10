import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"

export const createCategoryController= async (req, res)=>{
    try{
        const {name}= req.body
        if(!name){
            return res.status(401).send({message: 'Name is required'})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'Category Already Exisits'
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true, 
            message: 'new category created successfully',
            category
        }) 
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in Category',
            error,
        })
    }
}

export const updateCategorController = async (req, res)=>{
    try{
        const {name} = req.body
        const {cid} = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            cid,
            {name, slug: slugify(name)},
            {new: true}
        )
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            category,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error in update Category',
            error,
        })
    }
}

export const deleteCategoryController = async (req, res)=>{
    try{
        const {cid} = req.params
        const category = await categoryModel.findByIdAndDelete(cid)
        res.status(200).send({
            success: true,
            message: 'category deleted successfully',
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error while delete categories',
            error,
        })
    }
}


export const categoryController = async (req, res)=>{
    try{
        const category = await categoryModel.find({})
        res.status(200).send({
            success:true,
            message: "all Categories list",
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error while getting all categories',
            error,
        })
    }
}

export const singleCategoryController  = async (req, res)=>{
    try{
        const category = await categoryModel.findOne({ slug: req.params.slug})
        res.status(200).send({
            success:true,
            message: "Single Categories ",
            category
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message:'Error while  getting single categories',
            error,
        })
    }
}