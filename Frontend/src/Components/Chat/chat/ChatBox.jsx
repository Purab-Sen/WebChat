import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { AccountContext } from "../../../Context/AccountProvider";
import { useContext, useEffect, useState } from "react";
import getConversation from "../../../../apis/getConversation.js";

const ChatBox = () => {
  const {person,account,setAccount} = useContext(AccountContext);
  const [conversation,setConversation] = useState({});
  useEffect(()=>{
    const getConversationDetails  = async () =>{
      let {data,status} = await getConversation({senderId:account.sub,receiverId:person.sub});
      if(status === 401){
        setAccount(null);
      }
      if(data)
        setConversation(data);
      else getConversationDetails();
    }
    getConversationDetails();
  },[person.sub])
  return (
    <>
      <ChatHeader person={person} account={account}/>
      {Object.keys(conversation).length > 0 && <Messages person={person} conversation={conversation}/>}
    </>
  );
};

export default ChatBox;
