
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ProfileModal from "./ProfileModal";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from '@mui/material/CircularProgress';
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../animation/Typing.json";

import io from "socket.io-client";
import { ChatState } from "../Context/ChatProvider";
import { FormControl, IconButton, Box , Input, Typography } from "@mui/material";

const ENDPOINT = "http://localhost:5030";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    // eslint-disable-next-line
  }, []);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://localhost:5030/api/message/${selectedChat._id}`,
        config
      );
      console.log(data);
      setMessages(data);
      setLoading(false);

      socket.emit("join chat", selectedChat._id);
    } catch (error) {
          toast.error("Failed to Load the Messages", toastOptions);
          // console.error(error);
          setLoading(false);
        }
      };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "http://localhost:5030/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error("Failed to send the Message", toastOptions)
        
      }
    }
  };



  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log(newMessageRecieved);
      if (
        !selectedChatCompare || 
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Typography
          sx={{fontSize:{ xs: "28px", md: "30px" }, padding:2, width:"100%",
           fontFamily:"work sans", display:"flex", justifyContent:{xs:"space-between"}, alignItems:"center"}}
          >
            <IconButton
              display={{ xs: "flex", md: "none" }}
              
              onClick={() => setSelectedChat("")}
              >
                <ArrowBackIcon />
                </IconButton>
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {/* {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  /> */}
                </>
              ))}
          </Typography>
          <Box
          sx={{ position:"relative",display:"flex", flexDirection:"column", justifyContent:"flex-start", alignItems:"flex-end",padding:3,
          bgcolor:"#f8E8E8", width:{xs:"90vw",md:"67.5vw"}, height:"73vh", overflowY:"hidden", borderRadius:10}}
            
          >
            {loading ? (
               <CircularProgress 
               sx={{position:"absolute",left:"50%", top:"50%"}}
               />
              
            ) : (
              <div style={{marginBottom:"55px",width:"100%",display:"flex", flexDirection:"column", overflowY:"scroll",scrollbarWidth:"none"}}>
                
                <ScrollableChat messages={messages} />
              </div>
            )}
 
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
              sx={{width:"95%",position:"absolute", bottom:25, display:"flex"}}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    // height={50}
                    width={70}
                    style={{ position:"absolute",bottom: 25, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <div style={{width:"10%"}}>
                </div>
              )}
              <Input
              sx={{width:"100%", bgcolor:"#E0E0E0", borderRadius:4, padding:"5px 15px"}}
                variant="filled"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl> 
          </Box>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <Typography fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Typography>
        </Box>
      )}
      <ToastContainer/>
    </>
  );
};

export default SingleChat;