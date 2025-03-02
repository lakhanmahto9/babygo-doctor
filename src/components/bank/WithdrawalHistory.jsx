import React, { useEffect, useState } from "react";
import BankHome from "./BankHome";
import { CurrencyRupee } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import { FetchUpiWithdraw } from "../../redux/slice/withdrawSlice";
import { FetchBankAmount } from "../../redux/slice/withdrawBankSlice";
import { useThemeColors } from "../../utils/useThemeColor";

const WithdrawalHistory = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const upi = useSelector((state) => state.upiwithdraw?.upi || []);
  const bank = useSelector((state) => state.bankwithdraw?.bank || []);
  const [selectedDate, setSelectedDate] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchUpiWithdraw());
    dispatch(FetchBankAmount());
  }, [dispatch]);
  const filteredUpi = upi.filter((item) =>
    selectedDate
      ? moment(item.createdAt).format("YYYY-MM-DD") === selectedDate
      : true
  );

  const filteredBank = bank.filter((item) =>
    selectedDate
      ? moment(item.createdAt).format("YYYY-MM-DD") === selectedDate
      : true
  );
  return (
    <BankHome>
      <div className={`w-full border rounded-md ${isDarkEnabled ? "border-gray-600" : "" }`} style={{background:colors.cardBg,color:colors.text}}>
        <div className={`w-full h-14 border-b flex justify-between items-center px-4 ${isDarkEnabled ? "border-gray-600" : ""}`}>
          <p className="text-sm font-semibold text-slate-500">
            Withdrawal History
          </p>
          <div className="flex gap-2 p-1">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`text-sm border px-2 py-1 rounded-md ${isDarkEnabled ? "border-gray-600" : ""}`}
              style={{background:colors.primary,colorScheme: isDarkEnabled ? "dark" : "light",}}
            />
          </div>
        </div>
        <div className="w-full flex flex-wrap flex-col sm:flex-row p-4 gap-2">
          {filteredUpi.length > 0 &&
            filteredUpi.map((item, index) => (
              <div
                key={index}
                className={`w-full sm:w-[32%] h-auto border rounded-xl p-2 shadow-md ${isDarkEnabled ? "border-gray-600" : ""}`}
                style={{background:colors.primary}}
              >
                <div className="flex justify-between">
                  <p className="text-xs font-semibold">UPI ID:- {item.upi}</p>{" "}
                  <p className="text-xs text-red-500">{item.status}</p>
                </div>
                <p className="text-lg font-bold">
                  <CurrencyRupee size={14} /> {item.amount}
                </p>
                <p className="text-xs">
                  {moment(item.createdAt).format("MMM - DD , YYYY - hh:mm A")}
                </p>
              </div>
            ))}
          {filteredBank.length > 0 &&
            filteredBank.map((item, index) => (
              <div
                key={index}
                className={`w-full sm:w-[32%] h-auto border rounded-xl p-2 shadow-md ${isDarkEnabled ? "border-gray-600" : ""}`}
                style={{background:colors.primary}}
              >
                <div className="flex justify-between">
                  <p className="text-xs font-semibold">
                    A/C:- {item.accountNumber}
                  </p>{" "}
                  <p className="text-xs text-red-500">{item.status}</p>
                </div>
                <p className="text-lg font-bold">
                  <CurrencyRupee size={14} /> {item.amount}
                </p>
                <p className="text-xs">
                  {moment(item.createdAt).format("MMM - DD , YYYY - hh:mm A")}
                </p>
              </div>
            ))}
          {filteredUpi.length < 1 && filteredBank.length < 1 && (
            <div className="w-full flex justify-center items-center">
              <div className="w-full sm:w-1/3 border my-10 sm:my-20 px-4 py-10 text-center rounded-2xl">
                <p className="text-sm font-semibold">
                  Withdraw history not found!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </BankHome>
  );
};

export default WithdrawalHistory;
