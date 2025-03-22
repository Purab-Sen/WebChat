import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
configDotenv();
const SECRET_KEY = process.env.JWT_SECRET_KEY;
const authenticateUser = (req,res,next)=>{
    const path = req.path;
    if(path == "/login")return next();
    const token = req.cookies["auth-token"];
    if(!token)return res.status(401).json({message:"Access Denied"});
    try{
        const decoded = jwt.decode(token,SECRET_KEY);
        req.userSub = decoded;
        next();
    }catch(err){
        res.status(401).json({message:"Invalid Token"});
    }
}
export default authenticateUser;