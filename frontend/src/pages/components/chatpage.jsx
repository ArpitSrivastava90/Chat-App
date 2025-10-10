import { useChatStore } from "../../store/useChatStore";
import ActiveTabSwitch from "./ActivetabSwitch";
import ChatContainer from "./ChatContainer";
import ChatList from "./ChatList";
import ContactList from "./ContactList";
import NoConversationPlaceholder from "./NoConversationPlaceholder";
import ProfileHeader from "./profileheader";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className=" w-full  h-screen flex justify-center items-center ">
      <div className="mainContainer w-[90vw] h-[700px] ">
        <div className="w-full h-full flex rounded-xl overflow-hidden shadow-lg">
          {/* Left Side */}
          <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
            <ProfileHeader />
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* Right Side (Chat Area) */}
          <div className="flex flex-1 flex-col bg-white backdrop-blur-sm">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
