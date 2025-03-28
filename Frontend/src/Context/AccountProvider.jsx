import { createContext, useState,useRef,useEffect } from "react";
import {io} from "socket.io-client";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [person,setPerson] = useState({});
  const [activeUsers,setActiveUsers] = useState([]);
  const [loading,setLoading] = useState(true);

  const socket = useRef();
  useEffect(()=>{
    if(account){
      socket.current = io(`${import.meta.env.VITE_SOC_URL}`)
      socket.current.on("connect",()=>{
        setLoading(false);
      })
    }
  },[account])
  return (
    <AccountContext.Provider
      value={{
        account,
        setAccount,
        person,
        setPerson,
        socket,
        activeUsers,
        setActiveUsers,
        loading,
        setLoading  
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
export default AccountProvider;
