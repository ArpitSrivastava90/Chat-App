import jwt from "jsonwebtoken";
import { ENV } from "./env.js";
import User from "../models/Users.js";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  return token;
};

export const Middelware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(404).json({ msg: "Token not found" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) {
      return res.status(404).json({ msg: "Token is not valid" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error at middleware", error);

    return res.status(500).json({ msg: "Internal server error" });
  }
};
