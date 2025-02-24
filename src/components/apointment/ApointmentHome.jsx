import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { BackIcon, DocumentIcon, FilterIcon } from "../../assets/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { GetBookApointment } from "../../redux/slice/getBookApointmentSlice";
import moment from "moment/moment";

const ApointmentHome = () => {
  const apointment = useSelector((state) => state.apointment?.apointment || []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetBookApointment());
  }, [dispatch]);
  return (
    <Layout>
      <div className="w-full relative">
        <div className="h-14 w-full sticky top-0 px-4 border bg-[#9e78ce] shadow-md flex justify-between items-center">
          <div className="flex gap-4">
            <BackIcon color="#fff" height="24" width="24" />
            <p className="text-white font-semibold">Apointment</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="w-auto cursor-pointer">
              <FilterIcon color="#fff" width="24" height="24" />
            </div>
            <div>
              <input
                type="date"
                className="border border-white p-2 text-slate-400 rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 p-4">
          {apointment.map((item, index) => (
            <div
              key={index}
              className="h-auto w-full border shadow-md rounded-2xl p-4 flex"
            >
              <div className="w-1/3 border-r p-1">
                <p className="text-xs text-slate-500">
                  Apointment No :- {item?.apointmentNumber}
                </p>
                <p className="text-sm text-slate-500 font-semibold">
                  Dr. {item?.name}
                </p>
                <p className="text-sm text-slate-500 font-semibold">
                  Visiting Time :- {item?.startTime} to {item?.endTime}
                </p>
                <p className="text-sm text-slate-500">
                  {item?.address} {item?.locality} {item?.city}
                </p>
                <p className="text-sm text-slate-500">
                  {item?.state} - {item?.zipCode}
                </p>
              </div>
              <div className="w-1/3 border-r p-1">
                <p className="text-xs text-slate-500">Owner Details</p>
                <p className="text-sm text-slate-500 font-semibold">
                  {item?.petOwnerName} - {item?.petOwnerPhoneNumber}
                </p>
                <p className="text-sm text-slate-500 font-semibold">
                  Breed Type/Age :- {item?.breedType.toUpperCase()} /{" "}
                  {item?.breedAge}
                </p>
                <p className="text-sm text-slate-500">{item.petOwnerAddress}</p>
                <p className="text-sm text-slate-500">Jharkhand - 828306</p>
              </div>
              <div className="w-1/3 p-1">
                <p className="text-xs text-slate-500">
                  Apointment Date :-{" "}
                  {moment(item?.apointmentDate).format("MMM, DD-YYYY")}
                </p>
                <p className="text-sm text-slate-500 font-semibold">
                  Status - Pending
                </p>
                <div>
                  <div className="h-10 border my-2 w-32 bg-[#fbf5ff] flex justify-center items-center rounded-md gap-2">
                    <DocumentIcon color="#9e78ce" width="18" height="18" />{" "}
                    <p className="text-[#9e78ce]">Download</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ApointmentHome;
