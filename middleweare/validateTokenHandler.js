const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../constants");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
  let token;
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(UNAUTHORIZED);
        throw new Error("invalid token");
      }
      req.user = decoded.user;

      next();
    });
  }
  if (!token) {
    res.status(UNAUTHORIZED).json({
      title: "Unauthorized",
      message: "No token provided",
    });
  }
});

module.exports = validateTokenHandler;
