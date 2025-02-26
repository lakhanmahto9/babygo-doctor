import React, { useState } from "react";
import BankHome from "./BankHome";
import { CurrencyRupee } from "@mui/icons-material";
import { WalletIcon } from "../../assets/icons/Icons";

const Wallet = () => {
  const [selectAccount, setSelectAccount] = useState(true);
  return (
    <BankHome>
      <div className="w-full border bg-white">
        <div className="p-4">
          <p className="text-sm text-slate-500 font-semibold">
            Wallet & Withdraw
          </p>
        </div>
        <hr />
        <div className="w-full flex flex-col md:flex-row p-4 gap-4">
          <div className="w-full md:w-1/2 bg-white h-32 border rounded-2xl shadow-md flex flex-col justify-center items-center">
            <div className="px-4 py-1 bg-[#9e78ce] rounded-full flex justify-center gap-2 items-center">
              <WalletIcon color="white" width="20" height="20" />
              <div className="flex justify-center items-center">
                <CurrencyRupee sx={{ width: 14, color: "white" }} />
                <p className="text-white text-sm font-semibold">1009</p>
              </div>
            </div>
            <p className="text-xs mt-2">Available Balance</p>
          </div>
          <div className="w-full md:w-1/2 h-auto bg-white border rounded-2xl shadow-md">
            <div className="p-4">
              <p className="text-sm text-slate-500 font-semibold">Withdraw</p>
            </div>
            <hr />
            <div className="">
              <div className="p-4 w-full flex">
                <div className="w-3/5">
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="border border-slate-300 w-full h-12 rounded-l-md px-4 outline-purple-700"
                  />
                </div>
                <button className="w-2/5 bg-purple-700 h-12 rounded-r-md text-white">
                  Withdraw
                </button>
              </div>
              <hr />
              <div className="w-full">
                <div className="w-full h-12 flex">
                  <div
                    onClick={() => setSelectAccount(true)}
                    className={`w-1/2 flex justify-center items-center cursor-pointer ${
                      selectAccount ? "border-purple-700" : ""
                    } border-b-2 `}
                  >
                    <p
                      className={`font-bold ${
                        selectAccount ? "text-purple-700" : "text-slate-400"
                      }  `}
                    >
                      {" "}
                      UPI ID
                    </p>
                  </div>
                  <div
                    onClick={() => setSelectAccount(false)}
                    className={`w-1/2 flex justify-center items-center cursor-pointer ${
                      selectAccount ? "" : "border-purple-700"
                    } border-b-2`}
                  >
                    <p
                      className={`font-bold ${
                        !selectAccount ? "text-purple-700" : "text-slate-400"
                      }  `}
                    >
                      BANK
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  {selectAccount ? (
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2">
                        <input type="radio" className="accent-purple-700 w-5" />{" "}
                        <p>7004001861@ybl</p>
                      </div>
                      <div className="flex gap-2">
                        <input type="radio" className="accent-purple-700 w-5" />{" "}
                        <p>7004001865@axl</p>
                      </div>
                    </div>
                  ) : (
                    <div>bank</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BankHome>
  );
};

export default Wallet;
