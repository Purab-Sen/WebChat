import { ArrowBack } from "@mui/icons-material";
import { Drawer,Box, Typography,styled } from "@mui/material";
import Profile from "./Profile";


const drawerStyle = {
    boxShadow:'none',
    width:'400px',
    minWidth:'300px',
    position:'absolute'
}

const Header = styled(Box)`
    background:#008069;
    height:107px;
    display:flex;
    & > p,&>svg{
        margin-top:auto;
        font-weight:600;
        margin-bottom:15px;
        margin-left:20px;
        color:#FFFFFF;
    }
`;

const Component = styled(Box)`
    background:#ededed;
    height:85%;
`
const InfoDrawer = ({open,handleDrawer})=>{
    return (
        <>
            <Drawer
                open={open}
                onClose={()=>handleDrawer(false)}
                PaperProps={{sx:drawerStyle}}
                style={{zIndex:1300}}
            >
                <Header>
                    <ArrowBack onClick={()=>handleDrawer(false)}/>
                    <Typography>Profile</Typography>
                </Header>
                <Component>
                    <Profile/>
                </Component>
            </Drawer>
        </>
    )
}

export default InfoDrawer;