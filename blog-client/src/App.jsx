import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { logInSession } from "./commom/session";
import CreatePost from "./pages/CreatePost";

export const UserContext = createContext({});

function App() {
  const [userAuth, setUserAuth] = useState({});

  useEffect(() => {
    const userInSession = logInSession("user");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ user_token: null });
  }, []);
  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
