import { useContext, useRef } from "react";
import InputBox from "../components/InputBox";
import googleIcon from "../assets/imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../commom/session";
import { UserContext } from "../App";

const Login = () => {
  const authForm = useRef();

  const {
    userAuth: { user_token },
    setUserAuth,
  } = useContext(UserContext);

  const handleSubmitForm = (formData) => {
    axios
      .post("http://localhost:3000/login", formData)
      .then(({ data }) => {
        storeInSession("user", JSON.stringify(data));
        setUserAuth(data);
      })
      .catch(({ response }) => {
        toast.error(response.data.error);
      });
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();

    const form = new FormData(authForm.current);
    const formData = {};

    for (const [key, value] of form.entries()) {
      formData[key] = value;
    }

    handleSubmitForm(formData);
  };

  return user_token ? (
    <Navigate to="/" />
  ) : (
    <section className="min-h-[calc(100vh-100px)] flex items-center justify-center">
      <Toaster />
      <form ref={authForm} className="w-[80%] max-w-[400px] ">
        <h1 className="text-2xl font-gelasio capitalize text-center mb-16 mt-5">
          Đăng nhập
        </h1>
        <InputBox
          name="email"
          type="email"
          placeholder="Email"
          icon="fi-rr-envelope"
        />
        <InputBox
          name="password"
          type="password"
          placeholder="Mật Khẩu"
          icon="fi-rr-key"
        />
        <button
          className="btn-dark block mx-auto"
          type="submit"
          onClick={handleSubmitBtn}
        >
          Đăng nhập
        </button>
        <div className="relative w-full flex items-center gap-2 my-10 opacity-50 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>hoặc</p>
          <hr className="w-1/2 border-black" />
        </div>
        <button className="btn-dark flex items-center justify-center mx-auto w-[90%]">
          <img src={googleIcon} className="w-4 mr-2" />
          Đăng nhập bằng Google
        </button>
        <p className="text-xl text-center text-[#6B6B6B] my-5 ">
          Chưa phải thành viên
          <Link to="/register" className="underline text-black text-xl ml-1">
            Đăng ký
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Login;
