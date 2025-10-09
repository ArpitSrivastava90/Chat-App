import { Route, Routes } from "react-router";
import "./App.css";
import ChatPage from "./pages/components/chatpage";
import Signup from "./pages/components/signup";
import Login from "./pages/components/login";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
