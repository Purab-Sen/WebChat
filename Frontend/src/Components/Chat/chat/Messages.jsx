import { Box, styled,LinearProgress } from "@mui/material";
import Footer from "./Footer";
import { useContext, useEffect, useRef, useState } from "react";
import { AccountContext } from "../../../Context/AccountProvider";
import newMessage from "../../../../apis/newMessage.js";
import getMessages from "../../../../apis/getMessages.js";
import Message from "./Message.jsx";

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
  padding-top:10px;
`;
const Container = styled(Box)`
    padding:2px 60px;
`

const Messages = ({ person, conversation,conversationLoading, setConversationLoading }) => {
  const { account,socket,setAccount } = useContext(AccountContext);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessageFlag,setNewMessageFlag] = useState(false);
  const [file,setFile] = useState(null);
  const [image,setImage] = useState('');
  const scrollRef = useRef();
  const [incomingMessageFromSocket,SetIncomingMessageFromSocket] = useState(null);

  useEffect(() => {
    const getMessagesDetails = async () => {
      let {data,status} = await getMessages(conversation._id);
      if(status === 401){
        setAccount(null);
      }
      setMessages(data);
      setConversationLoading(false);
    };
    conversation._id && getMessagesDetails();
    setValue("");
  }, [conversation._id,newMessageFlag]); //here conversation._id is required because it can occur that initally on opening chat, conversation._id may not have been received, but after sometime it may come which will lead to reload of component with the received messages.
  

  //Note: The role of use effect here is only to make sure that socket.current.on event shouldn't interfere with react components. It is side effect. Socket is self able to detect the event of receive message i.e getMessage.
  useEffect(()=>{
    socket.current.on('getMessage',(message)=>{
      SetIncomingMessageFromSocket({
        ...message,
        createdAt:Date.now() //this message didn't come form mongdodb, it came directly from socket, so it doesn't have data value of mongodb.
      })
    })
  },[])

  //this is very important, as we know that multiple sender can send message to this user using socket so it becomes important to identify the sender inorder to show it in appropriate chat messages.
  useEffect(()=>{
    incomingMessageFromSocket && conversation?.members?.includes(incomingMessageFromSocket.senderId) &&
    setMessages(prev => [...prev,incomingMessageFromSocket]);
  },[incomingMessageFromSocket,conversation?._id])


  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  },[messages]);//dependency is messages because, as we send message, messages list is updated as new messages are again fetched.
  
  
  const sendText = async (e) => {
    const code = e.keycode || e.which;
    if (code === 13) {
      let message = {};
      if(!file){
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "text",
          text: value,
        };
      }else{
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        };
      }
      socket.current.emit('sendMessage',message);
      await newMessage(message);
      setValue("");
      setFile(null);
      setNewMessageFlag(prev=>!prev);
    }
  };
  return (
    <Wrapper>
      {conversationLoading?<LinearProgress/>:
      (<Component>
        {messages.map((message,index) => (
          <Container ref={index == messages.length-1?scrollRef:null}>
            <Message key={`message${index}`} message={message} />
          </Container>
        ))}
      </Component>)}
      <Footer sendText={sendText} value={value} setValue={setValue} file={file} setFile={setFile} setImage={setImage} />
    </Wrapper>
  );
};

export default Messages;
