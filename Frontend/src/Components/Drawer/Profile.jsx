import { Box, styled, Typography } from "@mui/material";
import { AccountContext } from "../../Context/AccountProvider";
import { useContext } from "react";


const ImageContainer = styled(Box)`
    display:flex;
    justify-content:center;
    padding:20px 0px;
`
const BoxWrapper = styled(Box)`
    background:#FFFFFF;
    padding:12px 30px 2px;
    box-shadow: 0px 1px 3px rgba(0,0,0,0.08);
    & :first-child{
        font-size:13px;
        color:#009688;
        font-weight:200;
    }
    & :last-child{
        margin:14px 0px;
        color:#4A4A4A;
    }
`

const Image = styled('img')({
    width:200,
    height:200,
    borderRadius:'50%',
})

const Description = styled(Box)`
    padding:15px 20px 28px 30px;
    & > p{
        font-size:13px;
        color: #8696a0;
    }

`
const Profile = () => {
    const {account} = useContext(AccountContext);
    return (
        <>
        <ImageContainer>
            <Image src={account.picture} alt="dp" />
        </ImageContainer>
        <BoxWrapper>
            <Typography>Your name</Typography>
            <Typography>{account.name}</Typography>
        </BoxWrapper>
        <Description>
            <Typography>This is not your username or Pin. It is only visible to your contacts</Typography>
        </Description>
        <BoxWrapper>
            <Typography>About</Typography>
            <Typography>It's not over yet!</Typography>
        </BoxWrapper>
        </>
    );
};

export default Profile;
