const express = require("express");
const errorhandler = require("./middleweare/errorhandler");
const app = express();

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRouter"));
app.use(errorhandler);

module.exports = app;
