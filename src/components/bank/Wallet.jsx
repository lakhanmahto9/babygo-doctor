import React, { useEffect, useState } from "react";
import BankHome from "./BankHome";
import { CurrencyRupee } from "@mui/icons-material";
import { WalletIcon } from "../../assets/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";
import UpiInfo from "./selectupiorbank/UpiInfo";
import BankInfo from "./selectupiorbank/BankInfo";
import { FetchBankDetails } from "../../redux/slice/addBankDetailSlice";
import { FetchUPIDetails } from "../../redux/slice/addUpiDetailSlice";
import { toast } from "react-toastify";
import { WithdrawAmount } from "../../redux/slice/withdrawSlice";
import { CircularProgress } from "@mui/material";
import { WithdrawBankAmount } from "../../redux/slice/withdrawBankSlice";
import { FetchConsultantData } from "../../redux/slice/authSlice";

const Wallet = () => {
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const auth = useSelector((state) => state.auth?.user?.data);
  const colors = useThemeColors(isDarkEnabled);
  const [selectAccount, setSelectAccount] = useState(true);
  const [amount, setAmount] = useState("");
  const [withdrawal, setWithdrawal] = useState(null);
  const [id, setId] = useState("upi");
  const [spin, setSpin] = useState(false);
  useEffect(() => {
    dispatch(FetchBankDetails());
    dispatch(FetchUPIDetails());
  }, [dispatch]);
  const withdrawType = (data) => {
    setWithdrawal(data);
  };

  const changeTab = (type) => {
    if (type === "upi") {
      setSelectAccount(true);
      setId("upi");
    } else {
      setSelectAccount(false);
      setId("bank");
    }
    setWithdrawal(null);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    try {
      if (!amount) {
        toast.warning("Enter amount");
        setSpin(false)
      } else if (!withdrawal) {
        toast.warning("Please select bank or upi");
        setSpin(false)
      } else {
        let data = {
          id,
          value: { ...withdrawal, amount },
        };
        if (id === "upi") {
          const result = await dispatch(WithdrawAmount(data));
          console.log(result.payload);
          if (result.payload?.data?.success) {
            setSpin(false);
            toast.success(result.payload?.data?.message);
            dispatch(FetchConsultantData());
          } else {
            setSpin(false);
            toast.error(result.payload?.message);
          }
        } else {
          const result = await dispatch(WithdrawBankAmount(data));
          if (result.payload?.data?.success) {
            setSpin(false);
            toast.success(result.payload?.data?.message);
            dispatch(FetchConsultantData());
          } else {
            setSpin(false);
            toast.error(result.payload?.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <BankHome>
      <div
        className={`w-full border rounded-md ${
          isDarkEnabled ? "border-gray-600" : ""
        }`}
        style={{ background: colors.background }}
      >
        <div className="p-4">
          <p className="text-sm text-slate-500 font-semibold">
            Wallet & Withdraw
          </p>
        </div>
        {/* <hr /> */}
        <div className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}></div>
        <div className="w-full flex flex-col md:flex-row p-4 gap-4">
          <div
            className={`w-full md:w-1/2 h-32 border rounded-2xl shadow-md flex flex-col justify-center items-center ${
              isDarkEnabled ? "border-gray-600" : ""
            }`}
            style={{ background: colors.primary, color: colors.text }}
          >
            <div className="px-4 py-1 bg-[#006afe] rounded-full flex justify-center gap-2 items-center">
              <WalletIcon color="white" width="20" height="20" />
              <div className="flex justify-center items-center">
                <CurrencyRupee sx={{ width: 14, color: "white" }} />
                <p className="text-white text-sm font-semibold">{auth?.wallet}</p>
              </div>
            </div>
            <p className="text-xs mt-2">Available Balance</p>
          </div>
          <div
            className={`w-full md:w-1/2 h-auto border rounded-2xl shadow-md ${
              isDarkEnabled ? "border-gray-600" : ""
            }`}
            style={{ background: colors.primary, color: colors.text }}
          >
            <div className="p-4">
              <p className="text-sm  font-semibold">Withdraw</p>
            </div>
            {/* <hr /> */}
            <div className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}></div>
            <div className="">
              <form onSubmit={handleSubmit} className="p-4 w-full flex">
                <div className="w-3/5 relative">
                  <input
                    type="text"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        setAmount(value);
                      }
                    }}
                    className={`w-full h-12 rounded-l-md px-6 border ${
                      isDarkEnabled ? "border-gray-600" : " border-slate-300 outline-[#006afe]"
                    }`}
                    style={{ background: colors.background }}
                  />
                  <div className="absolute top-3">
                    <CurrencyRupee />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-2/5 bg-[#006afe] h-12 rounded-r-md text-white"
                >
                  {spin ? (
                    <CircularProgress size={18} color="white" />
                  ) : (
                    "Withdraw"
                  )}
                </button>
              </form>
              {/* <hr /> */}
              <div className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}></div>
              <div className="w-full">
                <div className="w-full h-12 flex">
                  <div
                    onClick={() => changeTab("upi")}
                    className={`w-1/2 flex justify-center items-center cursor-pointer ${
                      selectAccount ? "border-[#006afe]" : ""
                    } border-b-2 `}
                  >
                    <p
                      className={`font-bold ${
                        selectAccount ? "text-[#006afe]" : "text-slate-400"
                      }  `}
                    >
                      {" "}
                      UPI ID
                    </p>
                  </div>
                  <div
                    onClick={() => changeTab("bank")}
                    className={`w-1/2 flex justify-center items-center cursor-pointer ${
                      selectAccount ? "" : "border-[#006afe]"
                    } border-b-2`}
                  >
                    <p
                      className={`font-bold ${
                        !selectAccount ? "text-[#006afe]" : "text-slate-400"
                      }  `}
                    >
                      BANK
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  {selectAccount ? (
                    <UpiInfo withdrawType={withdrawType} />
                  ) : (
                    <BankInfo withdrawType={withdrawType} />
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
