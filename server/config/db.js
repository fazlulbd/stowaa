import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("Conneted to MongoDB ")
    }catch(error){
        console.log(`Error in Mongodb ${error}`)
    }
}

export default connectDB;