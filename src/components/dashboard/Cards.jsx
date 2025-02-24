import React from "react";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";

const Cards = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
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
          New Apointment (10)
        </div>
        <div></div>
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
          Treatment Done (5)
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Cards;
