import { Dialog,Box,styled } from "@mui/material";
import EmptyChat from "./chat/EmptyChat";
import Menu from "./menu/Menu";
import ChatBox from "./chat/ChatBox";
import { AccountContext } from "../../Context/AccountProvider";
import { useContext } from "react";
const dialogStyle = {
    height: "95%",
    width: "100%",
    border: 0,
    maxWidth:"100%",
    maxHeight:"100%",
    boxShadow: "none",
    overflow: "hidden",
};

const Component = styled(Box)`
    display:flex;
    width:100%;
    height:100%;
`
const LeftComponent = styled(Box)`
    width:500px;
    min-width:300px;
`
const RightComponent = styled(Box)`
    width:100%;
    min-width:300px;
    border-left:1px solid rgb(226, 214, 214);
`

const ChatDialog = ()=>{
    const {person} = useContext(AccountContext);
    return (
        <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
            <Component>
                <LeftComponent>
                    <Menu/>
                </LeftComponent>
                <RightComponent>
                    {
                        Object.keys(person).length == 0? <EmptyChat/>:<ChatBox/>
                    }
                </RightComponent>
            </Component>
        </Dialog>
    );
}

export default ChatDialog;