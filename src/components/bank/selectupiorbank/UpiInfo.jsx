import React from "react";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../../utils/useThemeColor";

const UpiInfo = ({withdrawType}) => {
  const isDarkEnabled = useSelector((state)=> state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const upi = useSelector((state) => state.upi?.upi || []);
  return (
    <div className="w-full">
      {upi.length > 0 ? (
        upi.map((item, index) => (
          <div className={`flex flex-col gap-1 p-4 rounded-lg my-1 ${isDarkEnabled ? "bg-[#101c44]" : "bg-blue-50"}`} key={index}>
            <div className="flex gap-2">
              <input type="radio" name="upi" onChange={()=>withdrawType(item)} className="accent-[#006afe] w-5" />{" "}
              <p>{item.upi}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center items-center h-20">
          <p className="text-slate-500 font-semibold">
            UPI ID is not available
          </p>
        </div>
      )}
    </div>
  );
};

export default UpiInfo;
