const express = require("express");
const {
  userLogin,
  userCurrent,
  userSignUp,
  usersList,
} = require("../controller/userController");
const validateTokenHandler = require("../middleweare/validateTokenHandler");
const userRouter = express.Router();

userRouter.route("/").get(usersList);
userRouter.route("/login").post(userLogin);
userRouter.route("/register").post(userSignUp);
// userRouter.route("/current").get(userCurrent);
userRouter.route("/current").get(validateTokenHandler, userCurrent);

module.exports = userRouter;
