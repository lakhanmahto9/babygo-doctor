import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";

const Layout = ({ children }) => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  return (
    <div className="w-full flex">
      <div className="w-1/5 relative hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full lg:w-4/5"style={{background:colors.primary}}>{children}</div>
    </div>
  );
};

export default Layout;
