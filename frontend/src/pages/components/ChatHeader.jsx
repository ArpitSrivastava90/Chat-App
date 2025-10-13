import { useAuthStore } from "../../store/useAuthStore";
import { useChatStore } from "../../store/useChatStore";
import { IoMdClose } from "react-icons/io";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);
  if (!selectedUser) return null;

  return (
    <div className="h-16 flex justify-between items-center px-4 border-b border-slate-700 bg-slate-800/60 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={selectedUser.profilePic}
            alt={selectedUser.fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-800 rounded-full"></span>
        </div>

        {/* Name + Online */}
        <div className="flex flex-col">
          <span className="text-white font-medium">
            {selectedUser.fullName}
          </span>
          <span
            className={`${
              isOnline ? "text-xs text-green-400" : "text-xs text-gray-400"
            }`}
          >
            {" "}
            {isOnline ? "online" : "offline"}
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setSelectedUser(null)}
        className="text-slate-400 hover:text-white transition-colors"
        title="Close chat"
      >
        <IoMdClose size={22} />
      </button>
    </div>
  );
};

export default ChatHeader;
