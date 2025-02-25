import React, {  useState } from "react";
import Layout from "../layout/Layout";
import { BackIcon} from "../../assets/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment/moment";
import ApointmentDetails from "./ApointmentDetails";
import ConfirmModal from "./ConfirmModal";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "../../utils/useThemeColor";

const ApointmentHome = () => {
  const apointment = useSelector((state) => state.apointment?.apointment || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
 
  const openModal = (aptid) => {
    setOpen(true);
    setId(aptid);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const filteredApointments = apointment.filter((item) => {
    const matchDate =
      !selectedDate ||
      moment(item.apointmentDate).format("YYYY-MM-DD") === selectedDate;
    const matchStatus = !selectedStatus || item.status === selectedStatus;
    return matchDate && matchStatus;
  });
  const gotohome = () =>{
    navigate("/")
  }
  return (
    <Layout>
      <div className="w-full relative">
        <div className={`h-14 w-full sticky top-0 px-4 border shadow-md flex justify-between items-center ${isDarkEnabled ? "bg-[#101c44] border-gray-600" : "bg-[#9e78ce]"}`}>
          <div onClick={gotohome} className="flex gap-4">
            <BackIcon color="#fff" height="24" width="24" />
            <p className="text-white font-semibold hidden sm:block">Appointment</p>
          </div>
          <div className="flex justify-center items-center gap-4">
            <select
              className={`border p-2 text-white rounded-md outline-none  ${isDarkEnabled ? "bg-[#040836] border-gray-600":"bg-[#9e78ce]"}`}
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            <div>
              <input
                type="date"
                className={`border p-2 text-slate-400 rounded-md ${isDarkEnabled ? "border-gray-600 bg-[#040836]" : ""}`}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{
                  colorScheme: isDarkEnabled ? "dark" : "light", // Ensures Firefox adapts colors
                }}
              />
            </div>
          </div>
        </div>
        {filteredApointments && filteredApointments.length > 0 ? (
          <div className="w-full flex flex-col gap-4 p-4">
            {filteredApointments.map((item, index) => (
              <div
                key={index}
                className={`h-auto w-full border shadow-md rounded-2xl p-4 flex flex-col sm:flex-row ${isDarkEnabled ? "bg-[#101c44] border-gray-600" : ""}`}
              >
                <div className={`w-full sm:w-1/3 sm:border-r p-1 ${isDarkEnabled ? "border-gray-600" : ""}`}>
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
                <div className={`w-full sm:w-1/3 sm:border-r p-1 ${isDarkEnabled ? "border-gray-600" : ""}`}>
                  <p className="text-xs text-slate-500">Owner Details</p>
                  <p className="text-sm text-slate-500 font-semibold">
                    {item?.petOwnerName} - {item?.petOwnerPhoneNumber}
                  </p>
                  <p className="text-sm text-slate-500 font-semibold">
                    Breed Type/Age :- {item?.breedType.toUpperCase()} /{" "}
                    {item?.breedAge}
                  </p>
                  <p className="text-sm text-slate-500">
                    {item.petOwnerAddress}
                  </p>
                  <p className="text-sm text-slate-500">Jharkhand - 828306</p>
                </div>
                <div className="w-full sm:w-1/3 p-1">
                  <p className="text-xs text-slate-500">
                    Apointment Date :-{" "}
                    {moment(item?.apointmentDate).format("MMM, DD-YYYY")}
                  </p>
                  <p className="text-sm text-slate-500 font-semibold">
                    Status - {item.status}
                  </p>
                  <div className="w-full flex justify-between gap-4">
                    <ApointmentDetails apointmentdata={item} />
                    <button
                      disabled={item.status === "Done"}
                      onClick={() => openModal(item._id)}
                      className={`h-10 border my-2 w-32  flex justify-center items-center rounded-md gap-2 ${isDarkEnabled ? "border-gray-600" : "border-purple-600"}`}
                    >
                      <p className={`${isDarkEnabled ? " text-[#D3D3D3]":"text-[#9e78ce]"}`}>Status</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-96 flex justify-center items-center flex-col">
            <img src="/no-apointment.png" alt="" className="w-32 h-32" />
            <p className="text-sm font-semibold">No apointment found!</p>
          </div>
        )}
      </div>
      <ConfirmModal id={id} open={open} handleClose={handleClose} />
    </Layout>
  );
};

export default ApointmentHome;
