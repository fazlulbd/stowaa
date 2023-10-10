import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        requeired: true,
    },
    slug:{
        type: String,
        requeired: true,
    },
    description:{
        type: String,
        requeired: true,
    },
    brand:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        requeired: true,
    },
    category:{
        type: mongoose.ObjectId,
        ref: 'category',
        requeired: true,
    },
    instock:{
        type: String,
        requeired: true,
    },
    rating:{
        type: Number,
        requeired: true,
    },
    image:{
        type: String,
        requeired: true,
    },
    color:{
        type: [String],
        required: true, 
    },
    size:{
        type: [String],
        required: true, 
    },

}, {timestamps: true})

export default mongoose.model('products', productSchema)