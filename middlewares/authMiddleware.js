import JWT from "jsonwebtoken"
import userModel from "../models/userModel.js";

//Protected routes token based
//middleware-along with request and response their is an object of next.When we are trying to get request ,first next will get validated and then only we will get response.Untill next is get executed it will show us previous code .We cant go to nextt code

export const requireSignIn = async(req,res,next) =>{
    try {
        const decode =JWT.verify(req.headers.authorization, process.env.JWT_SECRET);//tokens are present in headers
        req.user=decode;
        next()
    } catch (error) {
        console.log(error)
    }
} 
//admin access
export const isAdmin = async(req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success:false,
                message:"Unauthorized access"
            })
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:"error in admin middleware"
        })
    }
}