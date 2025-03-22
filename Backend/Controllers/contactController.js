import User from "../model/user.js"
export const getContacts = async (req,res)=>{
    try{
        const contacts = await User.find({});
        return res.status(200).json({data:contacts});
    }catch(err){
        return res.status(500).json(err.message);
    }
}
