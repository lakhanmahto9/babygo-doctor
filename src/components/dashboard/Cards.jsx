import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";
import moment from "moment";
import { GetBookApointment } from "../../redux/slice/getBookApointmentSlice";

const Cards = () => {
  const apointment = useSelector((state) => state.apointment?.apointment || []);
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const pending = apointment.filter((apt) => apt.status === "Pending");
  const done = apointment.filter((apt) => apt.status === "Done");
  const pendingCount = apointment.filter(
    (apt) => apt.status === "Pending"
  ).length;
  useEffect(() => {
    dispatch(GetBookApointment());
  }, [dispatch]);
  const doneCount = apointment.filter((apt) => apt.status === "Done").length;
  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div
        className={`w-full md:w-1/2 rounded-2xl h-60 border ${
          isDarkEnabled ? "border-gray-600" : ""
        }`}
        style={{ background: colors.cardBg, color: colors.text }}
      >
        <div
          className={`border-b p-4 text-sm font-semibold ${
            isDarkEnabled ? "border-gray-600" : ""
          }`}
        >
          New Appointment ({pendingCount})
        </div>
        <div className="p-4 flex flex-col gap-2 overflow-y-auto max-h-40 scrollbar-hide">
          {pending.map((item, index) => (
            <div key={index} className={`w-full p-2 rounded-md flex shadow-md justify-between ${isDarkEnabled ? "bg-[#040836]" : "border border-gray-200"}`}>
              <div>
                <p className="text-xs font-semibold">{item.petOwnerName}</p>
                <p className="text-xs font-semibold">
                  {item.petOwnerPhoneNumber}
                </p>
              </div>
              <div>
                <p className="text-xs">Appointment Date</p>
                <p>{moment(item.apointmentDate).format("MMM, DD - YYYY")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-full md:w-1/2 rounded-2xl h-60 border ${
          isDarkEnabled ? "border-gray-600" : ""
        }`}
        style={{ background: colors.cardBg, color: colors.text }}
      >
        <div
          className={`border-b p-4 text-sm font-semibold ${
            isDarkEnabled ? "border-gray-600" : ""
          }`}
        >
          {" "}
          Treatment Done ({doneCount})
        </div>
        <div className="p-4 flex flex-col gap-2 overflow-y-auto max-h-40 scrollbar-hide ">
          {done.map((item, index) => (
            <div key={index} className={`w-full p-2 rounded-md flex justify-between ${isDarkEnabled ? "bg-[#040836]" : "shadow-md border-gray-200"}`}>
              <div>
                <p className="text-xs font-semibold">{item.petOwnerName}</p>
                <p className="text-xs font-semibold">
                  {item.petOwnerPhoneNumber}
                </p>
              </div>
              <div>
                <p className="text-xs">Appointment Date</p>
                <p>{moment(item.apointmentDate).format("MMM, DD - YYYY")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cards;
