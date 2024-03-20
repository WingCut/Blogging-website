import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import CreatePost from "./pages/CreatePost";
import Navbar from "./components/Navbar";
import { logInSession } from "./common/session";
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
            <Route index element={<HomePage />} />
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
