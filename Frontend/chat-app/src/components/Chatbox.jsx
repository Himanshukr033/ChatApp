// import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";
import { Stack, Box } from "@mui/material";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "flex" : "none", md: "flex" },
        alignItems: "center",
        flexDirection: "column",
        justifyContent:"center",
        padding: 3,
        bgcolor: "#090420",
        height:"85vh",
        width: { xs: "92%", md: "68%" },
        borderRadius: "10px",
        marginLeft:{xs:0,md:2}
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
