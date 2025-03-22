import { Menu, MenuItem, styled } from "@mui/material";
import { useState } from "react";
import { MoreVert } from "@mui/icons-material";

const MenuOption = styled(MenuItem)`
  font-size: 14px;
  padding: 15px 60px 5px 24px;
  color: #4a4a4a;
`;

const HeaderMenu = ({openProfile,logOut}) => {
  const [open, setOpen] = useState(false);
  const handleClick = (e) => {
    setOpen(e.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };
  return (
    <>
      <MoreVert onClick={handleClick} />
      <Menu
        anchorEl={open}
        keepMounted
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuOption onClick={()=>{handleClose();openProfile(true);}}>Profile</MenuOption>
        <MenuOption onClick={()=>logOut()}>Sign out</MenuOption>
      </Menu>
    </>
  );
};
export default HeaderMenu;