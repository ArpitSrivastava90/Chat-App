import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import ChatPage from "./pages/components/chatpage";
import Signup from "./pages/components/signup";
import Login from "./pages/components/login";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <h1> . . .Loadeing </h1>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/signup"
        element={!authUser ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="/login"
        element={!authUser ? <Login /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
};

export default App;
