import { useChatStore } from "../../store/useChatStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore();
  return (
    <div className="tabs tabs-boxed bg-transparent p-2 m-2 flex justify-around">
      <button
        onClick={() => setActiveTab("chats")}
        className={` w-20 h-10 ${
          activeTab === "chats" ? " bg-cyan-500/20 " : "text-slate-400"
        }`}
      >
        Chats
      </button>
      <button
        onClick={() => setActiveTab("contacts")}
        className={`w-20 h-10 ${
          activeTab === "contacts" ? "bg-cyan-500/20" : "text-slate-400"
        }`}
      >
        contacts
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
