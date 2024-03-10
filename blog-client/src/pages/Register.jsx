import { useRef } from "react";
import InputBox from "../components/InputBox";
import googleIcon from "../assets/imgs/google.png";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const authForm = useRef();
  const navigate = useNavigate();

  const handleSubmitForm = (formData) => {
    axios
      .post("http://localhost:3000/register", formData)
      .then(({ data }) => {
        toast.success("Tạo tài khoản thành công");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
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

  return (
    <section className="min-h-[calc(100vh-100px)] flex items-center justify-center">
      <Toaster />
      <form ref={authForm} className="w-[80%] max-w-[400px] ">
        <h1 className="text-2xl font-gelasio capitalize text-center mb-16 mt-5">
          Đăng ký
        </h1>
        <InputBox
          name="fullname"
          type="text"
          placeholder="Họ Tên"
          icon="fi-rr-user"
        />
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
          Đăng ký
        </button>
        <div className="relative w-full flex items-center gap-2 my-10 opacity-50 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>hoặc</p>
          <hr className="w-1/2 border-black" />
        </div>
        <button className="btn-dark flex items-center justify-center mx-auto w-[90%]">
          <img src={googleIcon} className="w-4 mr-2" />
          Đăng ký bằng Google
        </button>
        <p className="text-xl text-center text-[#6B6B6B] my-5">
          Đã có tài khoản?
          <Link to="/login" className="underline text-black text-xl ml-1">
            Đăng nhập
          </Link>
        </p>
      </form>
    </section>
  );
};
export default Register;
