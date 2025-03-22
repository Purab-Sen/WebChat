
const logOutController = (req,res)=>{
    res.clearCookie("auth-token",{httpOnly:true});
    return res.status(200).json({message:"sign out successful"})
}

export default logOutController;