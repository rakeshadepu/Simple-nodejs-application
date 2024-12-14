const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

//code for checking whether user is authorised or not
//unauthorized user cannot access protected routes
const protect = async (req, res, next) => {
  let token;
  if (
    //checking for bearer tokens 
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) return res.status(401).json({ message: "No token provided" });
};

module.exports = { protect };
