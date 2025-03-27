import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


// login user
const loginUser = async (req,res) => {
     const {email,password} = req.body;

     try{
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User Doesn't exist"})
        }

        //check the given password is matching or not
        const isMatch = await bcrypt.compare(password,user.password);

        // if not matching 
        if (!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

       // if the password is matchin, then we will create a token
        const token = createToken(user._id);
        res.json({success:true,token})
     }
     catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
     }
}

// in response to the new user save in database we create a token
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async (req,res) => {
   const {name,password,email} = req.body;
   try {
    // checking whether the same user exists or not
    const exists = await userModel.findOne({email});
    if (exists) {
        return res.json({success:false,message:"User already exists"})
    }

    // validating email format & strong password
    if(!validator.isEmail(email)) {
        return res.json({success:false,message:"Please enter a valid email"})
    }

    //checking the password is of required length or not 
    if (password.length < 8) {
        return res.json({success:false,message:"Please enter a strong password"})
    }    

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    // creating new user
    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })

    // to save user in database
    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token});
} catch (error) {
      
      res.json({success:false,message:"Error"})
   }
}

export {loginUser,registerUser}