import { axiosIntsace } from "../../lib/axios.js";
import { useAuthStore } from "../../store/useAuthStore.js";

const ChatPage = () => {
  const { logout, authUser } = useAuthStore();
  console.log("authUser", authUser);
  const { fullName, email } = authUser;
  console.log("Sending URL", axiosIntsace.defaults.baseURL);
  const handleClick = () => {
    console.log("Sending URL", axiosIntsace.defaults.baseURL);
    logout();
  };
  return (
    <div>
      {" "}
      <button className="btn btn-primary" onClick={handleClick}>
        Logout
      </button>
      <h1>{fullName}</h1>
      <h1>{email}</h1>
    </div>
  );
};

export default ChatPage;
