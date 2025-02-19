import React, { useEffect, useState } from "react";
import { BellIcon } from "../../assets/icons/Icons";
import { Badge } from "@mui/material";
import moment from "moment/moment";

const Header = () => {
  const [currentTime, setCurrentTime] = useState(moment().format("MMM, DD - YYYY | HH:mm"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("MMM, DD - YYYY | HH:mm"));
    }, 1000); // Updates every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div className="w-full flex justify-between items-center">
      <div className="">
        <p className="text-sm">Welcome Back</p>
        <p className="font-bold">Lakhan Mahto</p>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <div className="p-2 bg-[#9e78ce] rounded-md text-white border border-[#9e78ce]">{currentTime}</div>
        <Badge badgeContent={4} color="secondary">
          <BellIcon color="#DA3FF3" width="20" height="20" />
        </Badge>
      </div>
    </div>
  );
};

export default Header;
