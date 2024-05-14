
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@mui/material";
const Chat = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box sx={{ display:"flex", alignItems:{xs:"center",md:"normal"}, justifyContent:{md:"space-between",xs:"center"}}} >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chat;