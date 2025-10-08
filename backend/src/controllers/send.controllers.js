import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.js";
import User from "../models/Users.js";

export const getAllContacts = async (req, res) => {
  try {
    const loginUserId = req.user._id;

    const filteredUsers = await User.find({ _id: { $ne: loginUserId } }).select(
      "-password"
    );

    if (filteredUsers.length === 0) {
      return res.status(200).json({ msg: "No contacts" });
    }
    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    return res.status(200).json({ msg: "here is your msg", message });
  } catch (error) {
    console.log("Error in getMessages controllers ", error.message);
    res.status(500).json("Server Error");
  }
};
