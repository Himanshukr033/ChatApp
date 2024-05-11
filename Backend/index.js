const express = require("express");
const cors = require("cors");


const app = express();

// const socket = require("socket.io");
require("dotenv").config();
const PORT = process.env.PORT;
app.use(cors());
app.use(express.json());
app.listen(PORT, console.log(`server started on PORT ${PORT}`));