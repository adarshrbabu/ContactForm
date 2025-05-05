const http = require("http");
const dotenv = require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/dbConnection");

const port = process.env.PORT || 3000;
connectDB();
const server = http.createServer(app);
server.listen(port);
