import React from "react";
import { AddIcon } from "../../assets/icons/Icons";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";
import { useNavigate } from "react-router-dom";

const ApointmentAddress = () => {
  const isDarkEnabled = useSelector((state)=> state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const navigate = useNavigate();
  const apointmentaddress = useSelector((state)=> state.apointmentaddress?.address.length || []);
  const gotoAddApointmentAddress = ()=>{
    navigate("/profile/add-apointment-address");
  }
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
      <div onClick={gotoAddApointmentAddress} className={`w-full md:w-1/2 h-auto p-4 rounded-xl border flex justify-start items-center gap-4 cursor-pointer ${isDarkEnabled ? "border-gray-600" : ""}`} style={{background:colors.cardBg}}>
        <div className="p-2 bg-[#006afe] rounded-full">
          <AddIcon color="#fff" width="20" height="20" />
        </div>{" "}
        <p className="text-sm font-semibold">Add Appointment Address</p>
      </div>
      <div className={`w-full md:w-1/2 bg-white h-auto p-4 rounded-xl border flex justify-start items-center gap-4 ${isDarkEnabled ? "border-gray-600" : ""}`} style={{background:colors.cardBg}}>
        <p className="text-sm font-semibold">Total Appointment Address ({apointmentaddress})</p>
      </div>
    </div>
  );
};

export default ApointmentAddress;
