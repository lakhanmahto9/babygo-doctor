import React from "react";
import Layout from "../layout/Layout";
import { BackIcon } from "../../assets/icons/Icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";

const Profile = ({ children }) => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors= useThemeColors(isDarkEnabled);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(pathname);
  const pageswithc = (link) =>{
    navigate(link);
  }
  return (
    <Layout>
      <div className={`w-full relative ${isDarkEnabled ? "bg-[#010844]" : " "}`} style={{color:colors.text}}>
        <div className={`flex items-center gap-4 h-12 border-b shadow-sm px-4 sticky top-0 cursor-pointer ${isDarkEnabled ? "border-gray-600" : ""}`} style={{background:colors.thirdCardBg}} onClick={()=>navigate('/')}>
          <BackIcon color={colors.text} width="24" height="24" />{" "}
          <p className="text-lg font-bold">Profile</p>
        </div>
        <div className="w-full flex flex-col sm:flex-row p-4 gap-4">
          <div className={`w-full sm:w-1/4 border rounded-md max-h-60 ${isDarkEnabled ? "border-gray-600" : ""}`}
           style={{background:colors.cardBg}}>
            <div className={`p-4 border-b ${isDarkEnabled ? "border-gray-600" : ""}`}>
              <p className="text-sm font-semibold">Profile Setting</p>
            </div>

            <div className="w-full flex flex-col justify-center items-center">
              <div className="p-1 w-full">
                <div
                  onClick={()=>pageswithc("/profile")}
                  className={`w-full h-10 flex justify-center items-center 
                    ${pathname === "/profile" 
                      ? isDarkEnabled 
                        ? "bg-[#040836]"  // Dark mode background color
                        : "bg-[#006afe]"  // Light mode background color
                      : isDarkEnabled 
                        ? "bg-[#010844]"  // Dark mode default background
                        : "bg-gray-400"}  // Light mode default background
                    rounded-md cursor-pointer`}
                  
                >
                  <p className="text-xs font-semibold text-white">My Profile</p>
                </div>
              </div>
              <div className="p-1 w-full">
                <div
                  onClick={()=>pageswithc("/profile/add-apointment-address")}
                  className={`w-full h-10 flex justify-center items-center 
                    ${pathname === "/profile/add-apointment-address"
                      ? isDarkEnabled 
                        ? "bg-[#040836]"  // Dark mode background color
                        : "bg-[#006afe]"  // Light mode background color
                      : isDarkEnabled 
                        ? "bg-[#010844]"  // Dark mode default background
                        : "bg-gray-400"}  // Light mode default background
                    rounded-md cursor-pointer`}
                >
                  <p className="text-xs font-semibold">Appointment Address</p>
                </div>
              </div>
              <div className="p-1 w-full">
                <div
                  onClick={()=>pageswithc("/profile/degree-and-certification")}
                  className={`w-full h-10 flex justify-center items-center 
                    ${pathname === "/profile/degree-and-certification"
                      ? isDarkEnabled 
                        ? "bg-[#040836]"  // Dark mode background color
                        : "bg-[#fbf5ff]"  // Light mode background color
                      : isDarkEnabled 
                        ? "bg-[#010844]"  // Dark mode default background
                        : "bg-white"}  // Light mode default background
                    rounded-md cursor-pointer`}
                >
                  <p className="text-xs font-semibold">Experience & Certification</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-3/4 h-auto">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
