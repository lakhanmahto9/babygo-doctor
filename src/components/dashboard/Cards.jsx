import React from "react";

const Cards = () => {
  return (
    <div className="flex w-full gap-4">
      <div className="w-1/2 bg-white rounded-2xl h-60 border">
        <div className="border-b p-4 text-sm text-[#313335] font-semibold">
          New Apointment (10)
        </div>
        <div></div>
      </div>
      <div className="w-1/2 bg-white rounded-2xl h-60 border">
        <div className="border-b p-4 text-sm text-[#313335] font-semibold">
          Treatment Done (5)
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Cards;
