import { CurrencyRupee } from "@mui/icons-material";
import React, { useEffect } from "react";
import { WalletIcon } from "../../assets/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";
import { useNavigate } from "react-router-dom";
import { FetchConsultantData } from "../../redux/slice/authSlice";

const Information = () => {
  const apointment = useSelector((state) => state.apointment?.apointment || []);
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth?.user?.data);
  const colors = useThemeColors(isDarkEnabled);
  const navigate = useNavigate();
  const gotowallet = () =>{
    navigate("/wallet")
  }
  useEffect(()=>{
     dispatch(FetchConsultantData());
  },[])
  return (
    <div className="w-full mt-1">
      <div className="md:px-2">
        <div
          className={`w-full rounded-2xl border  flex flex-col justify-center items-center p-4 ${
            isDarkEnabled ? "border-gray-600" : ""
          }`}
          // style={{ background: colors.thirdCardBg, color: colors.text }}
        >
          <img
            src={auth?.profile_pic || "/profile.png"}
            alt=""
            className="w-28 h-28 object-fill rounded-full"
          />
          <p className={`text-sm ${isDarkEnabled ? "text-[#D3D3D3]" : ""}`}>{auth?.name}</p>
          <p className={`text-sm ${isDarkEnabled ? "text-[#D3D3D3]" : ""}`}>{auth?.email}</p>
        </div>
      </div>
      <div className="md:p-2 w-full mt-2">
        <div
          className={`border w-full h-28 rounded-2xl flex flex-col justify-center items-center ${
            isDarkEnabled ? "border-gray-600" : ""
          }`}
          // style={{ background: colors.thirdCardBg, color: colors.text }}
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
      </div>
      {/* <hr className="mt-4 border-t-1 border-[#9e78ce]" /> */}

      <div className={`mt-4 border  ${isDarkEnabled ? "border-gray-600" : ""}`}></div>

      <div className="w-full md:p-2 mb-2">
        <div
          className={`bg-[#] border w-full h-80 rounded-2xl flex flex-col mt-4 ${
            isDarkEnabled ? "border-gray-600" : ""
          }`}
          style={{ background: colors.thirdCardBg, color: colors.text }}
        >
          <p className="text-sm font-semibold p-4">Transactin History</p>
          <hr className={`border-t-1 ${isDarkEnabled ? "border-gray-600" : ""}`} />
          <div className="p-4 flex flex-col gap-2 overflow-y-auto max-h-60 scrollbar-hide">
            {apointment.map((item, index) => (
              <div
                key={index}
                className={`w-full p-2 rounded-md ${isDarkEnabled ? "bg-[#040836]" : "shadow-md border-gray-200"}`}
              >
                <div>
                  <p className="text-xs font-semibold">{item.petOwnerName}</p>
                  <p className="text-xs font-semibold">
                  <CurrencyRupee sx={{ width: 14, color: colors.text }} />{item.amount}
                  </p>
                </div>
                <div className="flex gap-2">
                  <p className="text-xs">Order ID</p>
                  <p className="text-xs">{item.orderId}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
