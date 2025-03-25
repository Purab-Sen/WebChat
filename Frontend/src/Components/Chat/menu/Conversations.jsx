import {useEffect,useState,useContext} from "react";
import getUsers from "../../../../apis/Contacts";
import { Box, Divider, styled,LinearProgress } from "@mui/material";
import Contact from "./Contact";
import { AccountContext } from "../../../Context/AccountProvider";

const Component = styled(Box)`
    padding-top:10px;
    height:100%;
    overflow:overlay;
`
const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background: #e9edef;
    opacity:0.6;
`
const Conversations = ({text})=>{
    const [users,setUsers] = useState(null);
    const {account,setActiveUsers,socket,setAccount} = useContext(AccountContext);

    useEffect(()=>{
        const fetchData = async ()=>{
            let {data:result,status} = await getUsers();
            if(status === 401){
                setAccount(null);
            }
            const filteredUsers = result.filter((user)=>user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredUsers);
        }
        fetchData();
    },[text])

    useEffect(()=>{
        socket.current.emit('addUsers',account);
        socket.current.on('getUsers',(activeUsers)=>{
            setActiveUsers(activeUsers);
        })
    },[account]);

    return (
        <Component>{
            users == null?<LinearProgress 
            sx={{
                backgroundColor: "#fff",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#00bfa5",
                },
              }}
            />:
                users.map((user,index)=>{
                    return (<>
                        <Contact user={user} index={index}/>
                        <StyledDivider/>
                    </>)
                })
            }
        </Component>
    )
}

export default Conversations;