import mongoose from 'mongoose'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from'dotenv'
dotenv.config()
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }

    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    
    resentLink:{
        data:String,
        default:''
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})
//generating auth token
userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.TOKENSECRET,{expiresIn:'50m'})

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}
//find if email and password are exists
userSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({email})
    //console.log(user)
     if(!user){
         throw new Error('unable to login')
     }
     if(user.isVerified ===false){
         throw new Error('Account not verified')
     }
     const isMatch = await bcrypt.compare(password,user.password)
    
     if(!isMatch){
         throw new Error("unable to login")
     }
     return user
} 
//hash the plain text password
userSchema.pre('save', async function(next){
   const user = this
   if(user.isModified('password')){
       user.password = await bcrypt.hash(user.password, 8)
   }
   next() 
})
const User= mongoose.model('user',userSchema)
module.exports = User;