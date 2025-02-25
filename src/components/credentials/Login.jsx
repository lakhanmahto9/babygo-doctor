import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "../../assets/icons/Icons";
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
  const signup = () => {
    navigate("/signup");
  };
  const home = () => {
    navigate("/");
  };
  return (
    <div className="w-full md:px-60">
      <div className="w-full bg-[#e6f0f1] flex flex-col md:flex-row md:rounded-2xl">
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <div className="absolute top-0 md:top-32 right-0 md:right-20">
            <img src="/pow1.png" alt="" className="w-16 h-20" />
          </div>
          <div className="absolute top-5 md:top-32 left-2 md:left-20">
            <img src="/dot.png" alt="" className="w-8 h-3" />
          </div>
          <div className="flex gap-2 flex-col justify-center items-center mt-4">
            <p className="gudea-regular-italic text-xl">Sign in to continue</p>
            <p className="text-5xl caveat-brush-regular text-[#fa8655]">
              PetPlantO
            </p>
            <p className="text-xl gudea-regular-italic">
              Connecting Nature at Home
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 py-10 md:px-10 relative">
          <div className="absolute top-0 right-20 md:right-40">
            <img src="/ful.png" alt="" className="w-72 h-48" />
          </div>
          <div className="absolute top-36 right-5 md:right-20">
            <img src="/pow2.png" alt="" className="w-16 h-16" />
          </div>
          <div className="w-full bg-[#fe8550] rounded-2xl px-4 md:px-16">
            <div className="h-32"></div>
            <p className="text-2xl jaldi-bold font-bold text-white">Log in</p>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
              <p className="text-white">Email</p>
              <input
                type="email"
                name="email"
                value={login.email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full rounded-full h-12 outline-none px-5 bg-[#edbea4] text-[#b96742]"
              />
              <p className="text-white">Password</p>
              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  value={login.password}
                  onChange={handleInput}
                  placeholder="Password"
                  className="w-full rounded-full h-12 outline-none px-5 bg-[#edbea4] text-[#b96742]"
                />
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
              <div className="w-full flex justify-center items-center my-4 bg-[#1c46ce] rounded-full p-2">
                <button
                  type="submit"
                  className="w-auto h-10 rounded-full px-10 text-white border-2"
                >
                  {spin ? "Please wait..." : "Login"}
                </button>
              </div>
            </form>
          </div>
          <div className="w-full flex justify-center items-center pt-4">
            <p className="text-[#1c46ce]">Forget Password?</p>
          </div>
          <div className="w-full flex gap-2 justify-center items-center pt-1">
            <p className="text-[#727686] text-xs">Haven't account?</p>
            <small className="text-[#1c46ce] cursor-pointer" onClick={signup}>
              Sign Up
            </small>
          </div>
          <div
            onClick={home}
            className="w-auto flex gap-2 justify-center items-center py-1 px-2 border border-[#1c46ce] cursor-pointer rounded-full text-[#1c46ce] hover:bg-[#1c46ce] hover:text-white"
          >
            Home
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
