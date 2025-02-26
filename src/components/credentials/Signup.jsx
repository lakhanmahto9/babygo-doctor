import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeIcon, EyeOffIcon } from "../../assets/icons/Icons";
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
      console.log(auth);
      setSpin(true);
      const result = await dispatch(DoctorRegister(auth));
      console.log(result.payload);
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
  const signin = () => {
    navigate("/signin");
  };
  return (
    <div className="w-full md:px-60 md:py-10">
      <div className="w-full bg-[#e6f0f1] flex flex-col md:flex-row md:rounded-2xl md:p-4">
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <div className="absolute top-0 right-0 md:top-32 md:right-20">
            <img src="/pow.png" alt="" className="h-16" />
          </div>
          <div className="absolute top-5 left-5 md:top-36 md:left-20">
            <img src="/dot.png" alt="" className="w-10" />
          </div>
          <div className="flex gap-2 flex-col justify-center items-center pt-4">
            <p className="gudea-regular-italic text-xl">Welcome to</p>
            <p className="text-5xl caveat-brush-regular text-[#fa8655]">
              PetPlantO
            </p>
            <p className="text-xl gudea-regular-italic">
              Connecting Nature at Home
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="h-32 w-full relative flex justify-center">
            <div className="sticky top-0 right-10 z-10">
              <img src="/tree.png" alt="" />
            </div>
          </div>
          <div className="h-auto bg-[#1c46ce] rounded-t-2xl md:rounded-2xl px-10 md:px-28 pt-10 pb-6 relative">
            <p className="text-2xl jaldi-bold font-bold text-white">Sign Up</p>
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col gap-2 my-4"
            >
              <p className="text-white">Name</p>
              <input
                type="text"
                placeholder="Full name"
                name="name"
                value={auth.name}
                onChange={handleInput}
                className="w-full rounded-full z-10 h-12 outline-none px-5 bg-[#edbea4] text-[#b96742]"
              />
              <p className="text-white">Email</p>
              <input
                type="email"
                name="email"
                value={auth.email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full rounded-full h-12 outline-none px-5 bg-[#edbea4] text-[#b96742]"
              />
              <p className="text-white">Password</p>
              <div className="relative">
                <input
                  type={eye ? "text" : "password"}
                  name="password"
                  value={auth.password}
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

              <div className="w-full flex justify-center items-center mt-4">
                <button
                  type="submit"
                  className="w-auto h-10 rounded-full px-10 text-white border-2"
                >
                  {spin ? "Pleasw wait..." : "Next"}
                </button>
              </div>
            </form>
            <div className="absolute bottom-8 right-1">
              <img src="/fishsticker.png" alt="" className="h-20" />
            </div>
            <div className="absolute bottom-8 left-1">
              <img src="/globe.png" alt="" className="h-20" />
            </div>
            <div className="flex gap-2 justify-center items-center">
              <p className="text-xs text-white">Already have an accoutn?</p>{" "}
              <p className="text-sm text-white cursor-pointer" onClick={signin}>
                Sign In
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
