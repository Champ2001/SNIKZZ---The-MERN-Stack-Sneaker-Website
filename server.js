import express from "express";//as we changed type in package.json to module for using es6
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import cors from "cors"
import productRoutes from "./routes/productRoutes.js";
import path from "path"
import {fileURLToPath} from 'url';
//configure env by simply calling it
dotenv.config();//if .env file is not present in the same directory then we can add path({'..'}) inside the brackets for specifying the actual path

//esmodule fix
const __filename = fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
//rest object
const app=express();

//middlewares
app.use(express.json());//previously we have to use body parser but now it is by default present in express .WE just have to use it
app.use(cors())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./client/build')))


//routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/category' , categoryRoutes)
app.use("/api/v1/product", productRoutes);

//database config
connectDB()


//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
}) 

//PORT
const PORT=process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgCyan.white)//use of backticks makes it dynamic and now we can use $(template literals)
})