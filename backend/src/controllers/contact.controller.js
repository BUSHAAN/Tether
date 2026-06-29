import mongoose from "mongoose";
import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";

export const searchUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const query = (req.query.q || "").trim();

    if (!query) {
      return res.status(200).json([]);
    }

    const existingContacts = await Contact.find({ userId: loggedInUserId }).select(
      "contactId"
    );
    const excludeIds = [
      loggedInUserId.toString(),
      ...existingContacts.map((c) => c.contactId.toString()),
    ];

    const users = await User.find({
      _id: { $nin: excludeIds },
      $or: [
        { fullName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    })
      .select("_id fullName email profilePic")
      .limit(20);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in searchUsers: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const addContact = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { contactId } = req.body;

    if (!contactId) {
      return res.status(400).json({ message: "Contact ID is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(contactId)) {
      return res.status(400).json({ message: "Invalid contact ID format" });
    }

    if (contactId === loggedInUserId.toString()) {
      return res.status(400).json({ message: "You cannot add yourself as a contact" });
    }

    const contactUser = await User.findById(contactId);
    if (!contactUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingContact = await Contact.findOne({
      userId: loggedInUserId,
      contactId,
    });

    if (existingContact) {
      return res.status(400).json({ message: "Contact already exists" });
    }

    await Contact.create({
      userId: loggedInUserId,
      contactId,
    });

    res.status(201).json({ message: "Contact added successfully" });
  } catch (error) {
    console.error("Error in addContact: ", error.message);
    res.status(500).json({ message: error.message });
  }
};
