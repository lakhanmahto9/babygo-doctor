import React from "react";
import { AddIcon } from "../../assets/icons/Icons";

const ApointmentAddress = () => {
  return (
    <div className="w-full flex gap-4 mt-2">
      <div className="w-1/2 bg-white h-auto p-4 rounded-xl border flex justify-start items-center gap-4 cursor-pointer">
        <div className="p-2 bg-[#9e78ce] rounded-full">
          <AddIcon color="#fff" width="20" height="20" />
        </div>{" "}
        <p className="text-sm font-semibold">Add Apointment Address</p>
      </div>
      <div className="w-1/2 bg-white h-auto p-4 rounded-xl border flex justify-start items-center gap-4">
        <p className="text-sm font-semibold">Total Apointment Address (3)</p>
      </div>
    </div>
  );
};

export default ApointmentAddress;
