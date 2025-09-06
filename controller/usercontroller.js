import User from "../models/usermodel.js";
import { isverified } from "./controller.js";

export const getUserById = async (req, res) => {
  try {
    const userid = req.user?.id; // Use ID from token
    if (!userid) {
      return res.json({ success: false, message: "No user ID found in token" });
    }
    const user = await User.findById(userid);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        id: user._id,
        isverified: user.isverified,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.json({ message: "Internal server error" });
  }
};