import LoginDialog from "./account/LoginDialog";
import {
  AppBar,
  Toolbar,
  styled,
  Box,
  LinearProgress,
  Typography,
} from "@mui/material";
import { AccountContext } from "../Context/AccountProvider";
import ChatDialog from "./Chat/ChatDialog";
import { useContext, useEffect } from "react";
import login from "../../apis/login.js";

const LoginHeader = styled(AppBar)`
  background-color: #00bfa5;
  box-shadow: none;
  height: 200px;
`;
const ChatHeader = styled(AppBar)`
  background-color: #00bfa5;
  box-shadow: none;
  height: 180px;
`;
const Component = styled(Box)`
  height: 100vh;
  background-color: #dcdcdc;
`;

const LoaderBox = styled(Box)`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LoaderText = styled(Typography)`
  font-size: 20px;
  color: #333;
  padding: 5px;
`;
const Messenger = () => {
  const { account, setAccount, loading, setLoading } =
    useContext(AccountContext);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const { data, status } = await login();
      if (status === 200) {
        setAccount(data);
      } else {
        setLoading(false);
      }
    };
    !account && checkLoginStatus();
  }, []);
  return (
    <Component>
      {loading ? (
        <LoaderBox>
          <LoaderText>Loading</LoaderText>
          <LinearProgress
            color="success"
            sx={{
              width: "300px",
              borderRadius: "5px",
              backgroundColor:"#ccc",
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#00bfa5",
              },
            }}
          />
        </LoaderBox>
      ) : account ? (
        <>
          <ChatHeader>
            <Toolbar></Toolbar>
          </ChatHeader>
          <ChatDialog />
        </>
      ) : (
        <>
          <LoginHeader>
            <Toolbar></Toolbar>
          </LoginHeader>
          <LoginDialog />
        </>
      )}
    </Component>
  );
};

export default Messenger;
