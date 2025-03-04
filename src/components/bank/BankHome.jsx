import React from "react";
import Layout from "../layout/Layout";
import { BackIcon } from "../../assets/icons/Icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";

const BankHome = ({ children }) => {
  const isDarkEnabled = useSelector((state)=> state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const changePage = (link) => {
    navigate(link);
  };
  const gotohome = () =>{
    navigate("/")
  }
  return (
    <Layout>
      <div className="w-full relative">
        <div onClick={gotohome} className={`w-full h-14 sticky top-0  shadow-sm flex justify-start items-center px-4 gap-4  ${isDarkEnabled ? "bg-[#101c44]" : "bg-[#006afe] border-b"}`}>
          <BackIcon color="#fff" width="24" height="24" />{" "}
          <p className="text-white font-semibold">Wallet</p>
        </div>
        <div className="w-full p-4 flex flex-col md:flex-row gap-4">
          <div className={`w-full md:w-1/3 h-auto max-h-72 rounded-md border ${isDarkEnabled ? "border-gray-600" : ""}`} style={{background:colors.background,color:colors.text}}>
            <p className="font-bold p-4" >Wallet & Account</p>
            {/* <hr /> */}
            <div className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}></div>
            <div className="w-full p-4 flex flex-col gap-2">
              {[
                { label: "WALLET", path: "/wallet" },
                { label: "ADD BANK DETAILS", path: "/wallet/add-bank-details" },
                { label: "ADD UPI Id", path: "/wallet/add-upi" },
                { label: "WITHDRAWAL HISTORY", path: "/wallet/withdrawal" },
              ].map((item) => (
                <div
                  key={item.path}
                  onClick={() => changePage(item.path)}
                  className={`p-3 w-full flex justify-center items-center cursor-pointer rounded-md 
                    ${pathname === item.path 
                      ? isDarkEnabled 
                        ? "bg-[#040836] border border-gray-600"  // Dark mode color
                        : "bg-[#f5faff] border"  // Light mode color
                      : isDarkEnabled 
                        ? "hover:bg-gray-700"  // Dark mode hover
                        : "hover:bg-gray-100"  // Light mode hover
                    }`}
                >
                  <p className="text-xs font-semibold text-slate-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-2/3">{children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default BankHome;
