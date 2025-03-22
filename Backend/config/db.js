import mongoose from "mongoose";

const createConnection= async()=>{
    try{
        await mongoose.connect(process.env.CONN_STRING);
        console.log("Connected to database");
    }catch(err){
        console.log("Couldn't connect to database",err);
    }

}

export default createConnection;