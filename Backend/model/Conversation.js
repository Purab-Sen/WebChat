import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members:{
        type:Array
    },
    messages:{
        type:String,
    }
},
{
    timestamps:true
});
const Conversation = mongoose.model('conversation',conversationSchema);

export default Conversation;