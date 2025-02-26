import React from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ApointmentIcon, HomeIcon, LogoutIcon, MoonIcon, ProfileIcon, SunIcon } from "../../assets/icons/Icons";
import { removeDark, setDark } from "../../redux/slice/darkModeSlice";
import { useThemeColors } from "../../utils/useThemeColor";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const auth = useSelector((state)=> state.auth?.user?.data)
  const colors = useThemeColors(isDarkEnabled);
  const sideBarLink = [
    {
      icon: HomeIcon,
      link: "Dashboard",
      href: "/",
    },
    {
      icon: ProfileIcon,
      link: "Profile",
      href: "/profile",
    },
    {
      icon: ApointmentIcon,
      link: "Appointment",
      href: "/appointment",
    },
  ];

  const changeLink = (item) => {
    navigate(item.href);
    // console.log(item)
  };

  const toggleDarkMode = () => {
    isDarkEnabled ? dispatch(removeDark()) : dispatch(setDark());
  };

  const logoutfunc = () => {
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div
      className="w-full h-screen p-2 shadow-md sticky top-0 left-0"
      style={{ background: colors.secondbackground, color: colors.text }}
    >
      <div className="h-[15%] flex gap-10 justify-center items-center">
        <div className="w-20 h-20">
          <img
            src={auth?.profile_pic || "/profile.png"}
            alt=""
            className="w-full h-full rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">Doctor Dashboard</h2>
          <p className="text-sm">PetPlantO</p>
        </div>
      </div>
      <div className="h-[70%]">
        {sideBarLink.map((item, index) => {
          const isActive = item.href === window.location.pathname;
          return (
            <div
              key={index}
              className={`w-full h-12 rounded-lg ${
                isActive ? "bg-[#006afe]" : ""
              } flex gap-4 items-center px-4 cursor-pointer mb-2`}
              onClick={() => changeLink(item)}
            >
              <item.icon
                color={isActive ? "#fff" : colors.text}
                width="24"
                height="24"
              />
              <p style={{ color: isActive ? "#fff" : colors.text }}>
                {item.link}
              </p>
            </div>
          );
        })}
        <div
          className={`flex gap-2 pl-4 cursor-pointer h-12 p-2 ${
            isDarkEnabled ? "bg-[#040836]" : ""
          }`}
          onClick={toggleDarkMode}
        >
          {isDarkEnabled ? (
            <MoonIcon height="16" width="16" color="white" /> // White for dark mode
          ) : (
            <SunIcon height="16" width="16" color="black" /> // Black for light mode
          )}

          <p className="" style={{ color: colors.text }}>
            Dark/Light Mode
          </p>
        </div>
      </div>
      <div className="h-[15%] p-2">
        <div
          className={`w-full h-full rounded-lg flex gap-8 justify-center items-center ${isDarkEnabled ? "bg-[#101c44]" : "shadow-md border border-gray-200"}`}
        >
          <div>
            <p className="text-sm font-bold">Log Out</p>
          </div>
          <div
            onClick={logoutfunc}
            className="w-10 h-10 bg-[#006afe] rounded-full flex justify-center items-center cursor-pointer"
          >
            <LogoutIcon color="#fff" width="24" height="24" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
