import jwt from 'jsonwebtoken'
require('dotenv').config()
export const validaData = {
    name:"Manzi Arsene",
    email:"hello2@gmail.com",
    password:"password"
}
export const invalidData={
    name:"Manzi Arsene",
    password:"password" 
}
export const forgetPassword={
    email: 'kayiganwa04@gmail.com',
}
export const resetPassword = {
    resentLink:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWVhN2YyNGQxOTQyYzE4OWVmY2ZkYjIiLCJpYXQiOjE2NDM1NTQ5NDcsImV4cCI6MTY0MzU1NjE0N30.2UaHf8TBz8rEq5SF_0lH1Jc0tmeN2zblswQCZ1ozij8',
    newPassword:"shumbushoeddy1"
}
export const { email, password } = validaData
export const loginUser = {
    email: 'kayiganwa04@gmail.com',
    password: 'shumbushoeddy1'
}
export const payload={email:loginUser.email}
export const generateToken = (payload, expiresIn = '7d') => {
    const token = jwt.sign({ ...payload }, process.env.TOKENSECRET, { expiresIn });
    return token;
};
export const userToken = generateToken(loginUser)