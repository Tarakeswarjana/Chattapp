const jwt = require("jsonwebtoken");
const User = require("../userModel.js");
const asyncHandler = require("express-async-handler");
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      if (decoded.id) {
        req.user = await User.findById(decoded.id).select("-password");
      } else {
        req.user = await User.findById(decoded._id).select("-password");
      }

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new error("not authorized token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
