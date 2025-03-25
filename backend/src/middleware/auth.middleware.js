import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const protectRoute = async (req, res, next) => {
  // Extract the acesss token from the Authorization header, if available. (sting splitted to remove bearer)
  const accessToken = req.cookies?.jwt;
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: "Access denied. No access token provided." });
  }
  try {
    // Verify the provided token using the secret key
    const decoded = jwt.verify(accessToken, JWT_SECRET);

    // Extract the user id from the decoded token
    if (!decoded) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    // Fetch the user from the database
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token.", err });
  }
};
