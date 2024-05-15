const express = require("express");
const cors = require("cors");
const { chats } = require("./data/data.js");
const connectDB = require("./config/config.js");
const userRoutes = require("./routes/userRoutes.js")
const chatRoutes = require("./routes/chatRoutes.js")
const messageRoutes = require("./routes/messageRoutes.js")
const {notFound, errorHandler} = require("./middleware/errorMiddleware.js")

const app = express();

// const socket = require("socket.io");
require("dotenv").config();
connectDB();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());



app.get('/', (req, res)=>{
    res.send("Api is running");    
})
app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)







app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, console.log(`server started on PORT ${PORT}`.yellow.bold));


const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "https://chat-app-033.netlify.app/",
      // credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  });