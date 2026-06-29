import mongoose from "mongoose";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Contact from "../models/contact.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";

export const getUsersforSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const contacts = await Contact.find({ userId: loggedInUserId }).select(
      "contactId"
    );
    const contactIds = new Set(
      contacts.map((c) => c.contactId.toString())
    );

    const conversationPartners = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: loggedInUserId },
            { receiverId: loggedInUserId },
          ],
        },
      },
      {
        $project: {
          partnerId: {
            $cond: {
              if: { $eq: ["$senderId", loggedInUserId] },
              then: "$receiverId",
              else: "$senderId",
            },
          },
        },
      },
      {
        $group: {
          _id: "$partnerId",
        },
      },
    ]);

    const partnerIds = conversationPartners.map((p) => p._id.toString());
    const allUserIds = new Set([...contactIds, ...partnerIds]);

    if (allUserIds.size === 0) {
      return res.status(200).json([]);
    }

    const users = await User.find({
      _id: { $in: Array.from(allUserIds) },
    }).select("_id fullName email profilePic");

    const usersWithMetadata = await Promise.all(
      users.map(async (user) => {
        const userObj = user.toObject();
        const isContact = contactIds.has(userObj._id.toString());

        const unreadMessageCount = await Message.countDocuments({
          receiverId: loggedInUserId,
          senderId: userObj._id,
          read: false,
        });

        return {
          _id: userObj._id,
          profilePic: userObj.profilePic,
          email: userObj.email,
          unreadMessageCount,
          isContact,
          ...(isContact && { fullName: userObj.fullName }),
        };
      })
    );

    usersWithMetadata.sort((a, b) => {
      if (a.isContact !== b.isContact) return a.isContact ? -1 : 1;
      if (b.unreadMessageCount !== a.unreadMessageCount) {
        return b.unreadMessageCount - a.unreadMessageCount;
      }
      const nameA = a.isContact ? a.fullName : a.email;
      const nameB = b.isContact ? b.fullName : b.email;
      return (nameA || "").localeCompare(nameB || "");
    });

    res.status(200).json(usersWithMetadata);
  } catch (error) {
    console.error("Error in getUsersforSidebar: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const loggedInUserId = req.user._id;

    if (
      !mongoose.Types.ObjectId.isValid(userToChat) ||
      !mongoose.Types.ObjectId.isValid(loggedInUserId)
    ) {
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

    if (receiverId === senderId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot send message to yourself" });
    }

    const isContact = await Contact.findOne({
      userId: senderId,
      contactId: receiverId,
    });

    if (!isContact) {
      const hasReceivedFromReceiver = await Message.exists({
        senderId: receiverId,
        receiverId: senderId,
      });

      if (!hasReceivedFromReceiver) {
        return res.status(403).json({
          message: "Add this user as a contact before messaging",
        });
      }
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

    const recieverSocketId = getRecieverSocketId(receiverId);

    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const viewMessages = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const loggedInUserId = req.user._id;

    if (
      !mongoose.Types.ObjectId.isValid(userToChat) ||
      !mongoose.Types.ObjectId.isValid(loggedInUserId)
    ) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    await Message.updateMany(
      {
        senderId: userToChat,
        receiverId: loggedInUserId,
        read: false,
      },
      { read: true }
    );

    res.status(200).json({ message: "Messages marked as read" });
  } catch (error) {
    console.error("Error in viewMessages: ", error.message);
    res.status(500).json({ message: error.message });
  }
};
