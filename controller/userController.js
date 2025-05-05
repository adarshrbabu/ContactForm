const asyncHandler = require("express-async-handler");
const contactModel = require("../models/contactModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @ desc get api
// @ route GET /api/user/lists
// @ access public

const usersList = asyncHandler(async (req, res) => {
  const users = await userModel.find();
  res.status(200).json(users);
});

// @ desc post api
// @ route GET /api/user/login
// @ access public

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (user && bcrypt.compare(password, user.password)) {
    const accessToekn = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user._id,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "60m" }
    );
    res.status(200).json({ accessToekn });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

// @ desc post api
// @ route GET /api/user/signUp
// @ access public

const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("please add the name, email and password");
  }
  const available = await userModel.findOne({ email });

  if (available) {
    res.status(400);
    throw new Error("email adress already exists");
  }
  // hash password
  const hashpassword = await bcrypt.hash(password, 10);

  const user = await userModel;
  userModel.create({
    email,
    password: hashpassword,
    username: name,
  });

  if (user) {
    res
      .status(201)
      .json({ message: `User created successfully for the user : ${email}` });
  } else {
    res.status(400);
    throw new Error("user not created");
  }
  // const user = await contactModel.create({ name, email, password });
});

// @ desc Get api
// @ route GET /api/user/signUp
// @ access public

const userCurrent = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  userLogin,
  userSignUp,
  userCurrent,
  usersList,
};
