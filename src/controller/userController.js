import User from '../model/user'
import sendEmail from '../helper/sendEmail'
import sendResetEmail from '../helper/sendResetEmail'
// import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const _=require('lodash')
require('dotenv').config()
exports.createUser=async(req,res)=>{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    try {
    
        const data = await user.save()
        const token = await user.generateAuthToken()
        const userData=user;
        const email=await sendEmail(userData,token)
       
        res.status(200).send({
            message:email,
            user: data,
            token:token

        })
        console.log(userData)
     } catch (error) {
         console.log(error.message)
         res.status(400).send(error.message)
  
}
}
exports.loginUser = async(req,res,next)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({message:"Login successfully",user, token,})

    } catch (error) {
        res.status(404).send(error.message)
    }
    next()
 }

exports.logoutUser = async(req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.status(200).send({message:'Logout successful!'});
    } catch (error) {
        res.status(404).send()
    }
}
exports.findAll=async(req,res)=>{
    await User.find().then((cust) => {
        res.status(200).send({
            message: 'Users found are:',
            cust
        })
    })
}
exports.forgetPassword=(req,res)=>{
    try {
        const {email}=req.body;
        User.findOne({email},(err,user)=>{
            if(err || !user){
return res.status(400).json({error:"user of this email does not exists"})
            }
            
            const restoken=jwt.sign({_id: user._id},process.env.TOKENSECRET,{expiresIn:'20m'});
            req.token = restoken
            req.user = user
    const mailOption= {
            email: email,
            subject: 'Reset your password',
            html: `<p>Dear User, you  requested a password reset to restore access to your account.</p> <br> <a href=${process.env.FRONTEND_URL}/userRoute/reset-password?token=${restoken}><b>Reset password Link</b></a>`,
            name: 'Welcome to My Books, Click on the link below to reset  your Password',
            body:`<a href=${process.env.FRONTEND_URL}/userRoute/verification?token=${restoken}>Link</a>`
          };
    const userData={
        user,
        resentLink:restoken
    }
    console.log(userData)
    // // user.resentLink=token
   
    return User.updateOne({_id: user._id},userData, (err,success)=>{
        if(err){
            return res.status(400).json({error:err})
                        }
                        else{
                            // console.log(transport)
                            const sendmail =sendResetEmail(mailOption,restoken);
                                if(sendmail){
                                    return res.status(200).json({message:'Email has been sent, kindly follow the instructions',userData});
                                }
                               
                            
                         
                        }
    })
        })
    } catch (error) {
    
        return res.status(500).json(error.message)
    }
}
exports.resetPassword=(req,res)=>{
        const{resentLink,newPassword}=req.body;
        if(resentLink){
            jwt.verify(resentLink,process.env.TOKENSECRET,function(error,decodedToken){
                if(error){
                    return res.json({
                        error:"incorrect token or it is expired"
                    })
                }
                User.findOne({resentLink},(err,user)=>{
                    if(err || !user){
                        return res.status(400).json({error:' user of this token does not exists'})
                    }
                    const obj={
                        ...user,
                        password:newPassword
                    }
                    user=_.extend(user,obj);
                    // res.json({user})
                    user.save((err,result)=>{
                        if(result){
                            return res.status(200).json({message:'Your password has been changed'});
                            
                                        }
                                        else{
                                            
                                            return res.status(400).json({error:"reset password error"}) 
                                            
                                         
                                        }
                    })
                })
            })
        }
        else{
            return res.status(400).json({error:'Authentication Error'})
        }
}
exports.verify=async(req,res)=>{
    const token=req.query.token;
    const id=jwt.verify(token,process.env.TOKENSECRET)
    const userExist=await User.findOne({_id:id})
    if(!userExist)return res.status(404).json({message:'User could not be found'})
    if(userExist.isVerified===true)return res.status(200).json({message:'The user is verified'})
    const verifiedAccount=await User.updateOne({_id:id},{isVerified:true})
    return res.status(200).json({
        message:"Account verified sucessfully",
        verifiedAccount
    });
    
}