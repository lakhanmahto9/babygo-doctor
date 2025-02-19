import React, { useState } from "react";
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  PasswordIcon,
} from "../../assets/icons/Icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DoctorLogin } from "../../redux/slice/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [spin, setSpin] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [eye, setEye] = useState(false);
  const eyetoggle = () => {
    setEye(!eye);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setLogin((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setSpin(true);
      const result = await dispatch(DoctorLogin(login));
      console.log(result.payload?.data?.data.type);
      if (result.payload?.data?.success) {
          navigate("/");
        toast.success(result.payload.data.message);
        setSpin(false);
      } else {
        setSpin(false);
        toast.warning(result.payload?.error);
      }
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };
  return (
    <div className="w-full p-2">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="email"
            name="email"
            value={login.email}
            onChange={handleInput}
            placeholder="Email"
            className="w-full h-12 rounded-xl pl-10 outline-none bg-slate-200 text-[#7b7b7b]"
          />
          <div className="absolute top-3 left-2">
            <EmailIcon color="#d4d3d3" width="24" height="24" />
          </div>
        </div>
        <div className="relative">
          <input
            type={eye ? "text" : "password"}
            name="password"
            value={login.password}
            onChange={handleInput}
            placeholder="Password"
            className="w-full h-12 rounded-xl pl-10 outline-none bg-slate-200 text-[#7b7b7b]"
          />
          <div className="absolute top-3 left-2">
            <PasswordIcon color="#d4d3d3" width="24" height="24" />
          </div>
          <div
            className="absolute top-3 right-2 cursor-pointer"
            onClick={eyetoggle}
          >
            {!eye ? (
              <EyeIcon color="#9e78ce" width="24" height="24" />
            ) : (
              <EyeOffIcon color="#9e78ce" width="24" height="24" />
            )}
          </div>
        </div>
        <div className="text-center mt-3 text-slate-400 cursor-pointer">
          forget password
        </div>
        <button
          type="submit"
          className="w-auto px-5 h-10 border rounded-full bg-[#9e78ce] text-white mt-3"
        >
          {spin ? (
            <div className="flex justify-center items-center gap-2">
              Submitting...
            </div>
          ) : (
            "SIGN IN"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
