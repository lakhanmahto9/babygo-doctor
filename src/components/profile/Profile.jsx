import React from "react";
import Layout from "../layout/Layout";
import { BackIcon } from "../../assets/icons/Icons";
import { useLocation, useNavigate } from "react-router-dom";

const Profile = ({ children }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(pathname);
  const pageswithc = (link) =>{
    navigate(link);
  }
  return (
    <Layout>
      <div className="w-full bg-[#fbf5ff] relative">
        <div className="flex items-center gap-4 h-12 border-b shadow-sm px-4 sticky bg-[#fbf5ff] top-0">
          <BackIcon color="#000" width="24" height="24" />{" "}
          <p className="text-lg font-bold">Profile</p>
        </div>
        <div className="w-full flex flex-col sm:flex-row p-4 gap-4">
          <div className="bg-white w-full sm:w-1/4 border max-h-60">
            <div className="p-4">
              <p className="text-sm font-semibold">Profile Setting</p>
            </div>
            <hr />
            <div className="w-full flex flex-col justify-center items-center">
              <div className="p-1 w-full">
                <div
                  onClick={()=>pageswithc("/profile")}
                  className={`w-full h-10 flex justify-center items-center ${
                    pathname === "/profile" ? "bg-[#fbf5ff]" : "bg-white"
                  }  rounded-md cursor-pointer`}
                >
                  <p className="text-xs font-semibold">My Profile</p>
                </div>
              </div>
              <div className="p-1 w-full">
                <div
                  onClick={()=>pageswithc("/profile/pan-information")}
                  className={`w-full h-10 flex justify-center items-center ${
                    pathname === "/profile/pan-information"
                      ? "bg-[#fbf5ff]"
                      : "bg-white"
                  }  rounded-md cursor-pointer`}
                >
                  <p className="text-xs font-semibold">PAN Information</p>
                </div>
              </div>
              <div className="p-1 w-full">
                <div
                  onClick={()=>pageswithc("/profile/add-apointment-address")}
                  className={`w-full h-10 flex justify-center items-center ${
                    pathname === "/profile/add-apointment-address"
                      ? "bg-[#fbf5ff]"
                      : "bg-white"
                  }  rounded-md cursor-pointer`}
                >
                  <p className="text-xs font-semibold">Apointment Address</p>
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
