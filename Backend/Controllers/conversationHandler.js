import Conversation from "../model/Conversation.js";

export const conversationCreator = async(req,res)=>{
    try{
        let senderId = req.body.senderId;
        let receiverId = req.body.receiverId;
        if(senderId === receiverId){
            receiverId="SELF"
        }
        const exist = await Conversation.findOne({members:{$all:[receiverId,senderId]}});
        if(exist){
            return res.status(200).json('Conversation already exists');
        }
        const newConversation = new Conversation({
            members:[senderId,receiverId]
        })
        await newConversation.save();
        return res.status(200).json('Conversation saved successfully');
    }catch(err){
        return res.status(500).json(err.message);
    }
}

export const getConversation = async (req,res)=>{
    try{
        let senderId = req.body.senderId;
        let receiverId = req.body.receiverId;
        if(senderId === receiverId){
            receiverId="SELF"
        }
        let conversation = await Conversation.findOne({members:{$all:[receiverId,senderId]}});
        return res.status(200).json(conversation);
    }catch(err){
        return res.status(500).json(err.message);
    }
}