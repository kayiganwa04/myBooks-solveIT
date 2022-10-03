import express from "express";
import bodyParser from "body-parser";
import connectDb from './src/connection/dbConnection';
import cors from "cors";
import index from './src/routes/index'
import fileupload from 'express-fileupload'
connectDb();
const app = express();
let corsOptions ={
  origin:'http://localhost:3001', 
  credentials:true,     
  optionSuccessStatus:200
}
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileupload({useTempFiles:true}))
app.use('/api',index)
app.get("/",(req, res) => {
  res.status(200).json({
    message: "Welcome to My book",
    status: "success",
  });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("server up and running on " + PORT);
}); 
module.exports=app