import React, { useState } from "react";
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  PasswordIcon,
  ProfileIcon,
} from "../../assets/icons/Icons";
import { useDispatch } from "react-redux";


import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DoctorRegister } from "../../redux/slice/authSlice";


const Signup = () => {
  const [eye, setEye] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [spin, setSpin] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [auth, setAuth] = useState({
    name: "",
    email: "",
    password: "",
  });
  const eyetoggle = () => {
    setEye(!eye);
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setAuth((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(auth)
      setSpin(true)
      const result = await dispatch(DoctorRegister(auth));
      console.log(result.payload);
      if (result.payload?.data?.success) {
        navigate("/");
        toast.success(result.payload.data.message);
        setSpin(false)
      }else{
        setSpin(false);
        toast.warning(result.payload?.error);
      }
    } catch (error) {
      setSpin(false)
      console.log(error);
    }
  };

  return (
    <div className="w-full p-2">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Full name"
            name="name"
            value={auth.name}
            onChange={handleInput}
            className="w-full h-12 rounded-xl pl-10 outline-none bg-slate-200 text-[#7b7b7b]"
          />
          <div className="absolute top-3 left-2">
            <ProfileIcon color="#d4d3d3" width="24" height="24" />
          </div>
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={auth.email}
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
            value={auth.password}
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
        <div className="mt-5">
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 bg-[#5da572]"
            />
            <span className="text-[#0f0f0f] text-sm">
              I Agree to the{" "}
              <span className="text-blue-600">Term & Condition</span> and{" "}
              <span className="text-blue-600">Privacy Policy</span>
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="w-auto px-5 h-10 border rounded-full bg-[#9e78ce] text-white mt-5"
        >
          {spin ? (
            <div className="flex justify-center items-center gap-2">
               Submitting...
            </div>
          ) : (
            "SIGN UP"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;
