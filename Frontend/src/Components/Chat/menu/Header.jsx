import { Box, styled } from "@mui/material";
import { AccountContext } from "../../../Context/AccountProvider";
import { useContext, useState } from "react";
import { Chat as MessageIcon, More, MoreVert } from "@mui/icons-material";
import HeaderMenu from "./HeaderMenu";
import InfoDrawer from "../../Drawer/InfoDrawer";
import logOutApi from "../../../../apis/LogOut";

const Component = styled(Box)`
  width: 100%;
  padding: 0px 16px;
  background: #ededed;
  height: 70px;
  display: flex;
  align-items: center;
`;
const Dp = styled("img")({
  height: "40px",
  width: "40px",
  borderRadius: "50%",
});
const Wrapper = styled(Box)`
  margin-left: auto;
`;

const MI = styled(MessageIcon)`
  margin-right: 25px;
`;
const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { account,setAccount,socket } = useContext(AccountContext);
  const logOut = async()=>{
    const {status} = await logOutApi();
    if(status === 200){
      socket.current.disconnect();
      setAccount(null);
    }
  }
  return (
      <Component>
        <Dp
          src={account.picture}
          alt="dp"
          onClick={() => setOpenDrawer(true)}
        />
        <Wrapper>
          <MI />
          <HeaderMenu openProfile={setOpenDrawer} logOut = {logOut}/>
        </Wrapper>
        <InfoDrawer open={openDrawer} handleDrawer={setOpenDrawer}/>
      </Component>
  );
};

export default Header;
