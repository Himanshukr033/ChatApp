const express = require("express");
const cors = require("cors");
const { chats } = require("./data/data.js");
const connectDB = require("./config/config.js");
const userRoutes = require("./routes/userRoutes.js")
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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, console.log(`server started on PORT ${PORT}`.yellow.bold));