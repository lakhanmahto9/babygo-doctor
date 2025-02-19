import React, { useState } from "react";
import Signup from "./credential/Signup";
import Login from "./credential/Login";

const Home = () => {
  const [isSignInClicked, setSignInClicked] = useState(false);

  const handleSignInClick = () => {
    setSignInClicked(!isSignInClicked);
  };
  return (
    <div className="w-screen md:h-screen p-2 lg:p-20 bg-[url('/background.png')]">
      <div className="w-full h-full flex flex-col lg:flex-row bg-[#fff] rounded-xl shadow-lg">
        <div
          className={`w-full lg:w-1/2 h-full bg-[#9e78ce] flex justify-center items-center p-10 lg:p-28 transform transition-transform duration-500
          ${
            isSignInClicked
              ? "sm:translate-y-full lg:translate-x-full lg:translate-y-0 rounded-r-xl"
              : "translate-y-0 translate-x-0 rounded-l-xl"
          }`}
        >
          <div className="flex flex-col justify-center items-center">
            <p className="text-white font-bold text-2xl lg:text-5xl">
              Welcome Back
            </p>
            <p className="text-sm text-center text-white mt-5">
              As a veterinarian specializing in pet care, I provide expert
              treatment for dogs and cats, ensuring their health and well-being.
              From routine check-ups and vaccinations to diagnosing and treating
              illnesses, my goal is to keep your furry companions happy and
              healthy. Whether it's preventive care or specialized treatment,
              I'm here to support you and your pets every step of the way!
            </p>
            <p
              onClick={handleSignInClick}
              className="h-12 w-auto px-10 cursor-pointer border rounded-full mt-10 flex justify-center items-center text-white"
            >
              {isSignInClicked ? "SIGN UP" : "SIGN IN"}
            </p>
          </div>
        </div>
        <div
          className={`w-full lg:w-1/2 bg-gray-100 flex justify-center items-center transform transition-transform duration-500 
          ${
            isSignInClicked
              ? "sm:-translate-y-full lg:-translate-x-full lg:translate-y-0 rounded-l-xl"
              : "translate-y-0 translate-x-0 rounded-r-xl"
          }`}
        >
          <div className="w-full lg:w-96 flex flex-col justify-center items-center">
            <p className="text-3xl font-bold text-[#9e78ce]">{`${
              isSignInClicked ? "PetPlantO Doctor Portal" : "Create Account"
            }`}</p>
            <p className="text-center text-[#9e78ce] mt-5 w-auto px-20 py-2 cursor-pointer border rounded-full ">
              Google
            </p>
            <p className="text-slate-400 text-sm my-3">{`Or use your email ${
              isSignInClicked ? "account" : "for registration"
            } `}</p>
            {!isSignInClicked ? <Signup /> : <Login />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
