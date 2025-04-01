import mongoose from "mongoose";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersforSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("_id fullName profilePic");
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersforSidebar: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const loggedInUserId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(userToChat) || !mongoose.Types.ObjectId.isValid(loggedInUserId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userToChat },
        { senderId: userToChat, receiverId: loggedInUserId },
      ],
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message, image } = req.body;
    const senderId = req.user._id;

    if (!message && !image) {
      return res.status(400).json({ message: "Please add a message or image" });
    }

    if (receiverId === senderId) {
      return res
        .status(400)
        .json({ message: "You cannot send message to yourself" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      image: imageUrl,
    });

    // todo: realtime messaging goes here

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ message: error.message });
  }
};
