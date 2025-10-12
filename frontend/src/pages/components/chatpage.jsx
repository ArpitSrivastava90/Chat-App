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
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="mainContainer w-[90vw] max-w-6xl h-[85vh] border border-slate-700 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
        <div className="w-full h-full flex">
          {/* Left Sidebar */}
          <div className="w-80 h-full bg-slate-800/40 backdrop-blur-xl flex flex-col border-r border-slate-700">
            <div className="p-4 border-b border-slate-700">
              <ProfileHeader />
            </div>

            <div className="p-3 border-b border-slate-700">
              <ActiveTabSwitch />
            </div>

            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 p-3 space-y-2">
              {activeTab === "chats" ? <ChatList /> : <ContactList />}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 bg-slate-900/50 backdrop-blur-lg flex flex-col">
            {selectedUser ? (
              <ChatContainer />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <NoConversationPlaceholder />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
