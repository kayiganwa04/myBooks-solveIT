const { response } = require('express')
const Employee=require('../model/employee')
const {employeeValidation}=require('../helper/validation')


//show list of employees
 const index= async (req,res,next)=>{

   
   const employee=await  Employee.find()
   try{
    res.status(200).json({employee:employee})
     }
     catch(err){
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        }
 }
 const show =async (req,res,next)=>{
     const id=req.query.id
     const employee=await Employee.findById(id)
     try{
         if(!employee){
             const error=new Error('Could not found employee.')
             error.statusCode=404;
             throw error
         }
         res.status(200).json({
             message:"employee found",employee:employee
         });
     }
     catch(err){
         if(!err.statusCode){
             err.statusCode=500;
         }
         next(err);
     }  
 }
 const store=async (req,res,next)=>{
      //validate before add employee
    const {error}=employeeValidation(req.body);
    if(error) return  res.status(400).send(error.details[0].message);
    //checking if email exist
    const emailExist=await Employee.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exist');
    
//adding employee
     const employee=new Employee({
         fullname:req.body.fullname,
         email:req.body.email,
         phone:req.body.phone,
         gender:req.body.gender,
         hire_date:req.body.hire_date,
         date_of_birth:req.body.date_of_birth,
         salary:req.body.salary

     })
     try{
const  savedEmployee= await employee.save();
res.status(201).json({message:'Employee saved'})
     }
     catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    } 
 }
  

 //update employee by id
 const update=async (req,res,next)=>{
     const {id}=req.query
     let updatedData={

        fullname:req.body.fullname,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender,
        hire_date:req.body.hire_date,
        date_of_birth:req.body.date_of_birth
        
     }
     const employee=await Employee.findByIdAndUpdate(id,{$set:updatedData})
     try{
        if(!employee){
            const error=new Error('Could not found employee.')
            error.statusCode=404;
            throw error
        }
        res.status(200).json({
            message:"employee updated",employee:employee
        });
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
 }
 //delete employee id
 const destroy= async (req,res,next)=>{
     const {id}=req.query
    const employee=await Employee.findByIdAndRemove(id)
    try{
        if(!employee){
            const error=new Error('Could not found employee.')
            error.statusCode=404;
            throw error
        }
        res.status(200).json({
            message:"employee deleted",employee:employee
        });
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    }
 }
 module.exports={
     index,show,store,update,destroy
 }