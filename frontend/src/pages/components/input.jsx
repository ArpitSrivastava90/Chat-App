"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Input = ({ text }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-80  h-10 pl-1 border border-white flex items-center rounded-xl">
      <motion.h1
        initial={{ y: "-50%" }}
        animate={
          isFocused ? { y: "-140%", scale: 0.85 } : { y: "-50%", scale: 1 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`absolute left-2 top-1/2  px-2 rounded-sm ${
          isFocused ? "text-white/70" : "text-white"
        } pointer-events-none bg-[#1d232a]`}
      >
        {text || "Email"}
      </motion.h1>

      <input
        type="text"
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== "")}
        className="h-full w-full bg-transparent border-none outline-none px-2 text-white placeholder-transparent"
      />
    </div>
  );
};

export default Input;
