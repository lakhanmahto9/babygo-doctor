import React from "react";
import { useSelector } from "react-redux";

const UpiInfo = () => {
  const upi = useSelector((state) => state.upi?.upi || []);
  return (
    <div className="w-full">
      {upi && upi.length > 0 ? (
        upi.map((item, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <div className="flex gap-2">
              <input type="radio" className="accent-[#006afe] w-5" />{" "}
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
