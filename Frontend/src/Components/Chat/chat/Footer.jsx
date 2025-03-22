// import { Container } from "@mui/material"

import { AttachFile, EmojiEmotionsOutlined, Mic } from "@mui/icons-material";
import { Box, InputBase, styled } from "@mui/material";
import { useEffect, useState } from "react";
import uploadFile from "../../../../apis/uploadFile.js";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const Search = styled(Box)`
  background-color: #ffffff;
  border-radius: 18px;
  width:100%;
`;
const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  height: 20px;
  padding-left: 25px;
  font-size: 14px;
`;

const ClipIcon = styled(AttachFile)`
    transform:rotate(40deg)
`

const Footer = ({value,sendText,setValue,file,setFile,setImage}) => {

  useEffect(()=>{
    const getImage = async ()=>{
      if(file) {
        const data = new FormData();
        data.append("name",file.name);
        data.append("file",file);
        const url = await uploadFile(data);
        setImage(url);
      }
    }
    getImage();
  },[file])
  const onFileChange = (e) =>{
    setFile(e.target.files[0]);
    setValue(e.target.files[0].name);
  }
  return (
    <Container>
      <EmojiEmotionsOutlined />
      <label htmlFor="fileInput">
        <ClipIcon/>
      </label>
      <input
        type="file"
        id="fileInput"
        style={{display:'none'}}
        onChange={(e)=>onFileChange(e)}
      />
      <Search>
        <InputField placeholder="Type a message" value={value} onChange={(e)=>setValue(e.target.value)} onKeyDown={(e)=>sendText(e)} />
      </Search>
      <Mic />
    </Container>
  );
};
export default Footer;
