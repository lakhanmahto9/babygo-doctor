import { CurrencyRupee } from "@mui/icons-material";
import React from "react";
import { WalletIcon } from "../../assets/icons/Icons";

const Information = () => {
  return (
    <div className="w-full">
      <div className="px-2">
        <div className="w-full bg-[#fbf5ff] rounded-2xl border border-[#9e78ce] flex flex-col justify-center items-center p-4">
          <img src="/profile.png" alt="" className="w-28 h-28 object-fill" />
          <p className="text-[#586069] text-sm">Lakhan Mahto</p>
          <p className="text-[#586069] text-sm">lakhan@gmail.com</p>
        </div>
      </div>
      <div className="p-2 w-full">
        <div className="bg-[#fbf5ff] border border-[#9e78ce] w-full h-28 rounded-2xl flex flex-col justify-center items-center">
          <div className="px-4 py-1 bg-[#9e78ce] rounded-full flex justify-center gap-2 items-center">
            <WalletIcon color="white" width="20" height="20" />
            <div className="flex justify-center items-center">
              <CurrencyRupee sx={{ width: 14, color: "white" }} />
              <p className="text-white text-sm font-semibold">1009</p>
            </div>
          </div>
          <p className="text-xs mt-2">Available Balance</p>
        </div>
      </div>
      <hr className="mt-4 border-t-1 border-[#9e78ce]" />

      <div className="w-full p-2">
        <div className="bg-[#fbf5ff] border border-[#9e78ce] w-full h-80 rounded-2xl flex flex-col mt-4">
          <p className="text-sm font-semibold p-4">Transactin History</p>
          <hr className="border-t-1 border-[#9e78ce]" />
        </div>
      </div>
    </div>
  );
};

export default Information;
