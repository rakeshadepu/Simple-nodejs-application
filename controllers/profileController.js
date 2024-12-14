const User = require("../models/User.js");

//get profile details of logged user
exports.getProfile = async (req, res) => {
  try {
    //remove getting password from database
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).send({message:"User found", user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};
