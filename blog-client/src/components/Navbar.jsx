import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../App";
import UserNavigation from "./UserNavigation";

const Navbar = () => {
  const [searchBox, setSearchBox] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);

  const {
    userAuth,
    userAuth: { user_token, profile_img },
  } = useContext(UserContext);

  const handleUserNavPanel = () => {
    setUserNavPanel((value) => !value);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  return (
    <>
      <nav className="z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white">
        <Link to="/" className=" whitespace-nowrap font-semibold">
          <span className="text-2xl px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            Blog's Share
          </span>
        </Link>
        <div
          className={
            "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-[#F3F3F3] py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (searchBox ? "block" : "hidden")
          }
        >
          <input
            type="text"
            placeholder="search"
            className="w-full md:w-auto bg-[#F3F3F3] p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-[#6B6B6B] md:pl-12"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-[#6B6B6B]"></i>
        </div>
        <div className="flex items-center gap-3 md:gap-6 ml-auto ">
          <button
            className="md:hidden bg-[#F3F3F3] w-12 h-12 rounded-full flex items-center justify-center hover:bg-black/10"
            onClick={() => setSearchBox((value) => !value)}
          >
            <i className="fi fi-rr-search text-xl"></i>
          </button>

          <Link to="/create" className="hidden md:flex gap-2 link rounded-full">
            <i className="fi fi-rr-pen-clip"></i>
            <p>Viết Blog</p>
          </Link>

          {user_token ? (
            <>
              <Link to="/">
                <button className="w-12 h-12 rounded-full bg-[#F3F3F3] relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-xl block"></i>
                </button>
              </Link>

              <div className="relative">
                <button
                  className="w-12 h-12 mt-1"
                  onClick={handleUserNavPanel}
                  onBlur={handleBlur}
                >
                  <img
                    src={profile_img}
                    className="w-full h-full object-cover rounded-full"
                  ></img>
                </button>
                {userNavPanel ? <UserNavigation /> : ""}
              </div>
            </>
          ) : (
            <>
              <Link className="btn-dark" to="/login">
                Đăng nhập
              </Link>

              <Link className="btn-light hidden md:block" to="/register">
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Navbar;
