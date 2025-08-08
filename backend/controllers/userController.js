import userModel from "../models/user.Model.js";
import validator from "validator";
import byrcpt, { genSalt } from "bcrypt"
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";


   const createToken  = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
   }

  // routes for user login
const loginUser = async(req,res)=>{

    try {
         const {email,password} = req.body
         const user= await userModel.findOne({email});
         if(!user){
             return  res.json({sucess:false,msg:"user doesn't exist"})
         }

         const isMatch = await byrcpt.compare(password,user.password)

        if(isMatch){
             const token = createToken(user._id)
             res.json({sucess:true, token})

        }else{
             res.json({sucess:false,message:"invalid credenstial"})
        }

    } catch (error) {
        console.log(error)
       res.json({sucess:false,message:error.message})
    }

}

// routes for register
const registerUser = async(req,res)=>{

       try {
             const {name,email,password} = req.body

            const exits = await userModel.findOne({email});
             // checking user Already exits are not
            if(exits){
              return  res.json({sucess:false,msg:"user already exists"})
            }
                 // validate email formate and strong password
            if(!validator.isEmail(email)){
                return  res.json({sucess:false,msg:"Please enter valid email"})
            }
            if(password.length < 8){
                return  res.json({sucess:false,msg:"Please enter strong password"})
            }
 
            //hasing password

            const salt = await byrcpt.genSalt(10);
            const hashedPassword = await  byrcpt.hash(password,salt);

            const newUser = new userModel({
                name,
                email,
                password:hashedPassword
            })
             const user = await newUser.save()

             const token = createToken(user._id)

             res.json({sucess:true, token})

      } catch (error) {
       console.log(error)
       res.json({sucess:false,message:error.message})
      }    
    
}
 

// routes for admin login

const adminLogin = async(req,res)=>{

    try {
          const {email,password} = req.body

          if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token =jwt.sign(email+password,process.env.JWT_SECRET)
             res.json({success:true,token})
          }else{
            res.json({success:false,message:"invalid credential"})
          }

    } catch (error) {
         console.log(error)
       res.json({success:false,message:error.message})
    }
    
}


export {loginUser,registerUser,adminLogin}