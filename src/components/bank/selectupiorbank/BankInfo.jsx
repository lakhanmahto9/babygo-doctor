import React from "react";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../../utils/useThemeColor";

const BankInfo = ({withdrawType}) => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const bank = useSelector((state) => state.bank?.bank || []);
  return (
    <div className="w-full">
      {bank.length > 0 ? (
        bank.map((item, index) => (
          <div className={`flex flex-col gap-1 p-4 rounded-lg my-1 ${isDarkEnabled ? "bg-[#101c44]" : "bg-blue-50"}`} key={index}>
            <div className="flex gap-2">
              <input type="radio" onChange={()=>withdrawType(item)} name="bank" className="accent-[#006afe] w-5" />{" "}
              <div>
                <p>{item.accountNumber}</p>
                <p className="text-xs">Account Number</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center items-center h-20">
          <p className="text-slate-500 font-semibold">Bank detail not found!</p>
        </div>
      )}
    </div>
  );
};

export default BankInfo;
