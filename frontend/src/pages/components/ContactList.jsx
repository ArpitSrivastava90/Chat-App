import { useEffect } from "react";
import img from "../../image/userpfp.jpg";
import { useChatStore } from "../../store/useChatStore";

const ContactList = () => {
  const { getAllContacts, allContacts, setSelectedUser, selectedUser } =
    useChatStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (!allContacts || allContacts.length === 0) {
    return (
      <div className="text-slate-400 text-center mt-4">No contacts found</div>
    );
  }

  return (
    <div className="space-y-2 overflow-y-auto max-h-[80vh] pr-1 custom-scrollbar pb-1">
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          onClick={() => setSelectedUser(contact)}
          className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all mt-2 ml-1 mb-1 
            ${
              selectedUser?._id === contact._id
                ? "bg-slate-600 ring-2 ring-blue-500"
                : "bg-slate-700 hover:bg-slate-600"
            }`}
        >
          {/* Avatar with online status */}
          <div className="relative">
            <img
              src={contact.profilePic || img}
              alt={contact.fullName}
              className="w-12 h-12 rounded-full object-cover border border-slate-500"
            />
            {contact.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-700 rounded-full"></span>
            )}
          </div>

          {/* Contact info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-white font-medium">{contact.fullName}</h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
