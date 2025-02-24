import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";
import { MenuIcon } from "../../assets/icons/Icons";
import SmallSidebar from "../sidebar/SmallSidebar";

const Layout = ({ children }) => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  return (
    <div className="w-full flex relative">
      <div className="w-1/5 relative hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full lg:w-4/5" style={{ background: colors.primary }}>
        {children}
      </div>
      <div className="fixed bottom-6 right-4 flex lg:hidden bg-white shadow-md w-16 h-16 rounded-full justify-center items-center">
        <SmallSidebar/>
      </div>
    </div>
  );
};

export default Layout;
