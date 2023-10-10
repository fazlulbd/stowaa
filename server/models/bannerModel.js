import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema({
    name:{
        type: String,
        requeired: true,
    },
    slug:{
        type: String,
        requeired: true,
    }, 
    title:{
        type: String,
        requeired: true,
    },
    subtitle:{
        type: String,
        requeired: true,
    },
    price:{
        type: Number,
        requeired: true,
    },
    button:{
        type: String,
        requeired: true,
    },
    image:{
        type: String,
        requeired: true,
    },
    

}, {timestamps: true})

export default mongoose.model('banners', bannerSchema)