import User from "../model/user.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
export const loginController = async(req,res)=>{
    try{
        if(Object.keys(req.body).length === 0){ //this indicates that it is first call for login try with no data send
            if(req.cookies["auth-token"]){
                const token = req.cookies["auth-token"];
                try{
                    const decodedUserSub = jwt.decode(token,SECRET_KEY);
                    return await handleUserLogin(req,res,decodedUserSub);
                }catch(err){
                    return res.status(401).json({message:"Invalid Token"});
                }
            }
            return res.status(401).json({message:"Access Denied"});
        }else{
            return await handleUserLogin(req,res,req.body.sub);
        }
    }catch(err){
        return res.status(500).json(err.message);
    }
}

const handleUserLogin = async(req,res,sub)=>{
    const exist = await User.findOne({sub:sub});
    res.cookie("auth-token",generateToken(sub),{
        maxAge:365*24*60*60*1000,
        httpOnly:true,
        secure:true,
        sameSite:"None"
    });
    if(exist){
        return res.status(200).json({data:exist,message:"user already exists"});
    }
    const newUser = new User(req.body);
    await newUser.save();
    return res.status(200).json({data:req.body,message:"user created successfully"});
}

const generateToken = (sub)=>{
    try{
        const token = jwt.sign(sub,SECRET_KEY);
        return token;
    }catch(err){
        console.log(err.message);
        return null;
    }
}
