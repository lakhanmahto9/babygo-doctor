import React from "react";
import { AddIcon } from "../../assets/icons/Icons";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";

const ApointmentAddress = () => {
  const isDarkEnabled = useSelector((state)=> state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
      <div className={`w-full md:w-1/2 h-auto p-4 rounded-xl border flex justify-start items-center gap-4 cursor-pointer ${isDarkEnabled ? "border-gray-600" : ""}`} style={{background:colors.cardBg}}>
        <div className="p-2 bg-[#9e78ce] rounded-full">
          <AddIcon color="#fff" width="20" height="20" />
        </div>{" "}
        <p className="text-sm font-semibold">Add Apointment Address</p>
      </div>
      <div className={`w-full md:w-1/2 bg-white h-auto p-4 rounded-xl border flex justify-start items-center gap-4 ${isDarkEnabled ? "border-gray-600" : ""}`} style={{background:colors.cardBg}}>
        <p className="text-sm font-semibold">Total Apointment Address (3)</p>
      </div>
    </div>
  );
};

export default ApointmentAddress;
