import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utlis.js";
import { loginShcmea, signupShcmea } from "../lib/validationSchema.js";
import User from "../models/Users.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const result = signupShcmea.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ msg: "request body is not valid" });
    }
    const { email, fullName, password } = result.data;

    const Existinguser = await User.findOne({ email });

    if (Existinguser)
      return res.status(400).json({ msg: "Email Already Exists" });

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      fullName,
      password: hashPassword,
    });

    if (user) {
      const saveUser = await user.save();
      generateToken(saveUser._id, res);
    }

    res.status(201).json({
      msg: "User created successfully",
      user: { ...user.toObject(), password: undefined },
    });

    try {
      await sendWelcomeEmail(user.email, user.fullName, ENV.CLIENT_URL);
    } catch (error) {
      console.error("Failed to send welcome Email error", error);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Internal server error, try after sometime" });
  }
};

export const login = async (req, res) => {
  try {
    const result = loginShcmea.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ msg: "Invalid Input" });
    }

    const { email, password } = result.data;
    const user = await User.findOne({
      email,
    });

    if (!user) return res.status(400).json({ msg: "user doesnt exists" });
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).json({ msg: "Invalid Credentials" });

    generateToken(user._id, res);

    return res.status(200).json({
      ...user.toObject(),
      password: undefined,
    });
  } catch (error) {
    console.log("Error at login", error);
    return res
      .status(500)
      .json({ msg: "Internal server error, try after sometime" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  return res.status(200).json({ msg: "Logout Successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    console.log("profilePic", profilePic);

    if (!profilePic) {
      return res.status(400).json({ msg: "Profile pic is required" });
    }

    const userId = req.user._id;
    console.log("userId", userId);

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    console.log("uploadResponse", uploadResponse);

    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.log("Error at update", error);
    return res
      .status(500)
      .json({ msg: "Internal server error, try after sometime" });
  }
};
