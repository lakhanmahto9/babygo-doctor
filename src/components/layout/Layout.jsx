import React from "react";
import Sidebar from "../sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="w-full flex">
      <div className="w-1/5 relative hidden lg:block">
        <Sidebar />
      </div>
      <div className="w-full lg:w-4/5">{children}</div>
    </div>
  );
};

export default Layout;
