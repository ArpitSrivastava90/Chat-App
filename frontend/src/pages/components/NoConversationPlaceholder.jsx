const NoConversationPlaceholder = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 select-none">
      <div className="w-20 h-20 rounded-full bg-slate-700 flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7 8h10M7 12h5m3 8a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>
      </div>
      <h2 className="text-lg font-medium text-white">
        No Conversation Selected
      </h2>
      <p className="text-sm text-slate-500 mt-1">
        Choose a contact from the sidebar to start chatting.
      </p>
    </div>
  );
};

export default NoConversationPlaceholder;
