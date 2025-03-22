import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";
import { qrCodeImage } from "../../assets/data";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { AccountContext } from "../../Context/AccountProvider";
import { useContext } from "react";
import login from "../../../apis/login.js";

const dialogStyle = {
  height: "100%",
  width: "60%",
  marginTop: "15%",
  maxWidth: "100%",
  maxHeight: "100%",
  border: "none",
  boxShadow: "none",
  overflow: "hidden",
};
const QRCode = styled("img")({
  height: 264,
  width: 264,
  margin: "50px 0 0 50px",
});
const Component = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justity-content: space-between;
`;
const Container = styled(Box)`
  margin: 56px 0px 56px 56px;
`;
const Title = styled(Typography)`
  font-size: 30px;
  color: #525252;
  font-weight: 100;
  font-family: inherit;
  margin-bottom: 25px;
`;
const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const LoginDialog = () => {
  const { setAccount } = useContext(AccountContext);    
  const onLoginSuccess = async(res) => {
    const data = jwtDecode(res.credential);
    const result = await login(data);
    if(result.status == 200)
      setAccount(result.data);
    else
      console.log("Token not found");
  };

  const onLoginError = (res) => {
    console.log("Login Failed", res);
  };

  return (
    <Dialog open={true} PaperProps={{ sx: dialogStyle }} hideBackdrop={true}>
      <Component>
        <Container>
          <Title>To use whatsapp on your computer:</Title>
          <StyledList>
            <ListItem>1. open whatsapp on your phone</ListItem>
            <ListItem>2. Tap Menu settings and select whatsapp web</ListItem>
            <ListItem>
              3. point your phone to this screen to capture the code
            </ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QRCode src={qrCodeImage} alt="qrcode" />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateX(25%)",
            }}
          >
            <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
          </Box>
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
