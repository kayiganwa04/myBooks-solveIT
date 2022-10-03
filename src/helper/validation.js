const { string } = require("joi");
const Joi=require("joi");


const employeeValidation=data=>{
    const schema= Joi.object({
        fullname:Joi.string()
        .min(5)
        .required(),
       
        email:Joi.string()
        .min(6)
        .required()
        .email(),
        phone:Joi.string()
        .max(13)
        .required(),
        gender:Joi.string()
        .min(4)
        .required(),
        hire_date:Joi.date()
        .required(),
        date_of_birth:Joi.date()
        .required(),
        salary:Joi.number()
        .required()
      
    });

return schema.validate(data);

};
module.exports.employeeValidation=employeeValidation;