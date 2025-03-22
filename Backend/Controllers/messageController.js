import Message from "../model/Message.js"
import Conversation from "../model/Conversation.js";

export const newController = async (req,res)=>{
    try{
        const newMessage = new Message(req.body);
        await newMessage.save();
        await Conversation.findByIdAndUpdate(req.body.conversationId,{messages:req.body.text});

        return res.status(200).json('Message has been sent successfully');
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const getMessages = async (req,res)=>{
    try{
        const messages = await Message.find({conversationId:req.params.id});
        return res.status(200).json({data:messages});
    }catch(err){
        return res.status(500).json(err.message);
    }
}