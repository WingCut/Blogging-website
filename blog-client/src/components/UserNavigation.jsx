import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../commom/session";

const UserNavigation = () => {
  const {
    userAuth: { username },
    setUserAuth,
  } = useContext(UserContext);

  const signOutUser = () => {
    removeFromSession("user");
    setUserAuth({ user_token: null });
  };
  return (
    <div className="bg-white absolute right-0 border border-gray-200 w-60">
      <Link to="/create" className="flex gap-2 link md:hidden pl-8 py-4">
        <i className="fi fi-rr-pen-clip"></i>
        <p>Viết Blog</p>
      </Link>
      <Link to={`/user/${username}`} className="flex link">
        Trang cá nhân
      </Link>
      <Link to={`/dashboard/blogs`} className="flex link">
        Bảng điều khiển
      </Link>
      <Link to={`/settings/edit-profile`} className="flex link">
        Cài đặt
      </Link>
      <span className=" absolute border-t broder-gray-300 w-full"></span>
      <button
        className="text-base w-full text-left p-3 px-4 hover:bg-[#F3F3F3]"
        onClick={signOutUser}
      >
        <h1 className="font-bold text-base">Đăng xuất</h1>
        <p className="text-[#6B6B6B]">@{username}</p>
      </button>
    </div>
  );
};
export default UserNavigation;
