import AddIcon from '@mui/icons-material/Add';
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import { ChatState } from "../Context/ChatProvider";
import { ToastContainer, toast } from "react-toastify";
import { Stack, Box, Button,  Typography } from "@mui/material";


const MyChats = ({ fetchAgain }) => {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

 

  const fetchChats = async () => {
    console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`${apiUrl}api/chat`, config);
      
      setChats(data);
    } catch (error) {
      toast.error("Failed to Load the chats!", toastOptions);
      
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <>
    <Box
      sx={{
        display: {
          xs: selectedChat ? 'none' : 'flex',
          md: 'flex'
        },
        flexDirection: 'column',
        alignItems: 'center',
        margin:0,
        padding: 3,
        height:"86vh",
        width: {
          xs: "100vw",
          md: "31vw"
        },
        border: "2px solid #000000",
        borderRadius: 5,
        backgroundColor: "#111140", 
      }}
    >
      <Box
      sx={{
        display: 'flex',
        alignItems:'center',
        justifyContent: 'center',
        padding:'0px 3px 3px 3px',
        width: "100%",
        fontFamily: "Work sans",
        fontSize:{xs:"28px", md:"30px"}
      }}
      >
        My Chats
        
      </Box>
      <Box
      sx={{
        display: 'flex',
        flexDirection:'column',
        padding:'3px',
        width: "100%",
        height:"100%",
        overflowY:"hidden"
      }}
      >
        {chats ? (
          <Stack sx={{overflowY:"scroll"}} >
            {chats.map((chat) => (
              <Box
              sx={{backgroundColor:selectedChat === chat ? "#2596be" : "#3e3c51", cursor:"pointer", color:"white", m:1,borderRadius:5}}
                onClick={() => setSelectedChat(chat)}
                px={3}
                py={2}
                key={chat._id}
              >
                <Typography>
                  {getSender(loggedUser, chat.users)}
                </Typography>
                {chat.latestMessage && (
                  <Typography fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Typography>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
    <ToastContainer />
    </>
  );
};

export default MyChats;