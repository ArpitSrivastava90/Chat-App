import { useEffect } from "react";
import { useChatStore } from "../../store/useChatStore.js";

const ChatList = () => {
  const { getMyChatPartners, setSelectedUser, isUsersLoading, chats } =
    useChatStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  if (isUsersLoading) {
    return <div>loading</div>;
  }

  if (chats.length === 0) {
    return <div>No chat found</div>;
  }
  console.log("chats", chats);

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="flex items-center gap-3 p-2 rounded-xl bg-slate-700 hover:bg-slate-600 transition-all cursor-pointer"
          onClick={() => setSelectedUser(chat)}
        >
          {/* Avatar with online status */}
          <div className="relative">
            <img
              src={chat.profilePic}
              alt={chat.fullName}
              className="w-12 h-12 rounded-full object-cover border border-slate-500"
            />
            {chat.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-700 rounded-full"></span>
            )}
          </div>

          {/* User info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-white font-medium">{chat.fullName}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
