
import React, { useState } from "react";
import { Button, Menu, MenuItem, Divider, Box, Typography, IconButton, ListItemIcon, Drawer, List } from "@mui/material";
import { Avatar } from "@mui/material";
import { Input } from "@mui/material";
import { Tooltip } from "@mui/material";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logout from '@mui/icons-material/Logout';
import { ToastContainer, toast } from "react-toastify";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
import { styled } from "@mui/system";
import { getSender } from "../config/ChatLogics";

const StyledDrawer = styled(Drawer)({
  "& .MuiPaper-root": {
    backgroundColor: "#333333",
    color: "#ffffff",
    width: 350,
    
  },
});



function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toggleDrawer = (newOpen) => () => {
    setIsOpen(newOpen);
  };
  
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const [anchorE2, setAnchorE2] = useState(null);
  const openNoti = Boolean(anchorE2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClickNoti = (event) => {
    setAnchorE2(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNoti = () => {
    setAnchorE2(null);
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!search) {
      toast.warning(
        "Please Enter something in search",
        toastOptions
      );
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${apiUrl}api/user?search=${search}`, config);
      console.log(data);
      setSearchResult(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {

      toast.error(
        "Failed to Load the Search Results",
        toastOptions
      );
    }
  };

  const accessChat = async (userId) => {
    // console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`${apiUrl}api/chat`, { userId }, config);
      console.log(data);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bgcolor="white"
        width="100vw"
        
      >
        <Tooltip title="Search Users to chat" arrow placement="bottom-end">
          <IconButton color="primary"  
          sx={{paddingX:"8px"}}
          onClick={toggleDrawer(true)}
          >
            <SearchIcon/>
            <Typography sx={{display: { xs: 'none', md: 'block' }, paddingX:2}}>Search User</Typography>
          </IconButton >
        </Tooltip>
        <Typography color="primary" variant="h6">Chat Application</Typography>
        <div>
        <Tooltip title="Chat Notifications">
            <IconButton color="primary"
            onClick={handleClickNoti}
            aria-controls={openNoti ? 'Notification' : undefined}
            aria-haspopup="true"
            aria-expanded={openNoti ? 'true' : undefined}
            >
              <NotificationsActiveIcon fontSize="large" margin="1" />
              <NotificationBadge count={notification.length} effect={Effect.SCALE} />
              
            </IconButton>
        </Tooltip>
            

           

          <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, marginX:1 }} alt={user.name} src={user.pic}/>
            <KeyboardArrowDownIcon/>
          </IconButton>
        </Tooltip>
        </div>
      </Box>


      <Menu anchorE1={anchorE2}
        id="Notification"
        open={openNoti}
        onClose={handleCloseNoti}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        // MenuListProps={{
        //   'aria-labelledby': 'basic-button',
        // }}
      >
          <MenuItem >
          {!notification.length && "No New Messages"}
          {notification.map((notif) => (
            <MenuItem
              key={notif._id}
              onClick={() => {
                setSelectedChat(notif.chat);
                setNotification(notification.filter((n) => n !== notif));
              }}
            >   { `New Message from ${getSender(user, notif.chat.users)}`}
            </MenuItem>
          ))}
        </MenuItem> 
      </Menu>


      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <ProfileModal user={user}>
           <MenuItem> <Avatar /> My Profile</MenuItem>
        </ProfileModal>
        <Divider />        
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <StyledDrawer open={isOpen} onClose={toggleDrawer(false)}>
      <Box sx={{ width: 350, overflowX:"hidden", display:"flex", flexDirection:"column",alignItems:"center" }} role="presentation">
        <Typography margin={1} variant="h6">Search Users</Typography>
        <Box display="flex" paddingBottom="2">
          <Input
            placeholder="Search by name or email"
            marginRight="2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ color:"#ffffff"  }}
          />
          <Button onClick={handleSearch}>Go</Button>
        </Box>

        <List sx={{alignSelf:"center"}}>
          {loading ? (
            <ChatLoading />
          ) : (
            Array.isArray(searchResult) && searchResult.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
        </List>
         {loadingChat && <CircularProgress style={{ margin: "auto", overflow:'hidden' }} />}
      </Box>
    </StyledDrawer>
      
      <ToastContainer/>
    </>
  );
}

export default SideDrawer;
