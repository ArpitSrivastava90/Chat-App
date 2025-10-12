import { useRef, useState } from "react";
import img from "../../image/userpfp.jpg";
import { MdLogout } from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";
import { GiSpeakerOff } from "react-icons/gi";
const mouseClicked = new Audio("/sounds/mouse-click.mp3");

import { useAuthStore } from "../../store/useAuthStore.js";
import { useChatStore } from "../../store/useChatStore";

const ProfileHeader = () => {
  const fileRef = useRef(null);
  const [selectedImage, setselectedImage] = useState(null);
  const { updateprofile, authUser, logout } = useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const Base64Image = reader.result;
      console.log("Base64Image", Base64Image);
      setselectedImage(Base64Image);
      await updateprofile({ profilePic: Base64Image });
    };
  };

  return (
    <div className="w-full h-20 border-b-2 border-gray-600 pb-5 flex justify-between items-center">
      <div className="leftOne w-44 h-14 flex items-center gap-3">
        <div
          className="relative w-14 h-14 cursor-pointer group"
          onClick={() => fileRef.current.click()}
        >
          <img
            src={selectedImage || authUser.profilePic || img}
            alt="User"
            className="w-full h-full rounded-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
            <span className="text-white text-xs">Change</span>
          </div>

          <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></span>

          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        <div className="userData flex flex-col justify-center leading-tight">
          <span className="text-lg font-medium">{authUser.fullName}</span>
          <p className="text-xs text-gray-300">online</p>
        </div>
      </div>

      <div className="rightOne w-20 h-14  rounded-md flex text-2xl justify-around items-center">
        <h1 className="hover:cursor-pointer">
          <MdLogout onClick={logout} />
        </h1>
        <h1 className="hover:cursor-pointer">
          <button
            onClick={() => {
              mouseClicked.currentTime = 0;
              mouseClicked
                .play()
                .catch((err) => console.log("audio play error", err));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <GiSpeaker className="h-8 w-8" />
            ) : (
              <GiSpeakerOff className="h-8 w-8" />
            )}
          </button>
        </h1>
      </div>
    </div>
  );
};

export default ProfileHeader;
