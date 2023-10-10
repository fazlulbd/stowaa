import JWT from 'jsonwebtoken'
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"

export const registerController = async(req, res)=>{
    try{
        const {name, email, password} = req.body 
        if( !name){
            return res.send({message: 'Name is required'})
        }
        if( !email){
            return res.send({message: 'email is required'})
        }
        if( !password){
            return res.send({message: 'password is required'})
        }

        const exisitingUser = await userModel.findOne({email})

        if(exisitingUser){
            return res.status(200).send({
                success: true,
                message: 'Already Register Please login'
            })
        }
        
        const hashedPassword = await hashPassword(password)

        const user = await new userModel({
            name,
            email, 
            password:hashedPassword,
        }).save()
        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in registeration",
            error
        })
    }
}


export const loginController = async (req, res)=>{
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        // check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registerd"
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
         expiresIn: "7d",  
        })
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            token,
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
}


export const forgotPasswordController = async (req, res)=>{
    try{
       const {email, newPassword} = req.body
       if(!email){
        res.status(400).send({message:'Email is required'})
       } 
       if(!newPassword){
        res.status(400).send({message:'New Password is required'})
       } 
    //    check
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success: false, 
            message: "Wrong Email or Answer"
        })
    }
    const hashed = await hashPassword(newPassword)
    await userModel.findByIdAndUpdate(user._id, {password: hashed})
    res.status(200).send({
        success: true, 
        message: 'Password Reset Successfully'
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    } 
}

export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password} = req.body;
      const user = await userModel.findById(req.user._id);
      //password
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
        //   phone: phone || user.phone,
        //   address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated SUccessfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error WHile Update profile",
        error,
      });
    }
  };