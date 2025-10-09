import { useAuthStore } from "../../store/useAuthStore.js";

const ChatPage = () => {
  const { logout } = useAuthStore();
  const handleClick = () => {
    logout();
  };
  return (
    <div>
      {" "}
      <button className="btn btn-primary" onClick={handleClick}>
        Logout
      </button>{" "}
    </div>
  );
};

export default ChatPage;
