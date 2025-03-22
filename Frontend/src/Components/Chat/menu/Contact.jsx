import { Box, styled, Typography } from "@mui/material";
import { AccountContext } from "../../../Context/AccountProvider";
import { useContext, useEffect, useState } from "react";
import setConversation from "../../../../apis/setConversation.js";
import placeHolderImage from "./generic_profile_picture.jpg"

const Component = styled(Box)`
  display: flex;
  height: 60px;
  padding: 13px 0;
  cursor: pointer;
  align-items: center;
`;
const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  margin: "0 20px",
});

const Contact = ({ user,index }) => {
  const [imageUrl,setImageUrl] = useState(placeHolderImage);
  const { account, setPerson } = useContext(AccountContext);
  const setOtherUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account.sub, receiverId: user.sub });
  };
  useEffect(()=>{
    const x = setTimeout(()=>{
      setImageUrl(user.picture);
    },index*300);
    return ()=>clearInterval(x);
  },[])
  return (
    <Component onClick={() => setOtherUser()}>
      <Box>
        <Image src={imageUrl} alt="dp" />
      </Box>
      <Box>
        <Typography>{user.sub === account.sub ? `${user.name}(You)` : user.name}</Typography>
      </Box>
    </Component>
  );
};

export default Contact;
