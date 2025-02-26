import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { editApointAddress } from "../../redux/slice/addMultipleAddressSlice";
import { useThemeColors } from "../../utils/useThemeColor";

const EditApointmentAddress = ({ id, editaddress, closeEditAddressForm }) => {
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  //   const formatDateTimeLocal = (dateString) => {
  //     if (!dateString) return "";
  //     const date = new Date(dateString);
  //     const localDate = new Date(date.getTime());
  //     return localDate.toISOString().slice(0, 16);
  //   };
  const [inputValue, setInputValue] = useState({
    name: editaddress.name || "",
    phone: editaddress.phone || "",
    startTime: editaddress.startTime || "",
    endTime: editaddress.endTime || "",
    clinicName: editaddress.clinicName || "",
    zipCode: editaddress.zipCode || "",
    locality: editaddress.locality || "",
    limitUser: editaddress.limitUser || "",
    address: editaddress.address || "",
    city: editaddress.city || "",
    state: editaddress.state || "",
  });

  const [spin, setSpin] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hadleSubmitForm = async (e) => {
    e.preventDefault();
    setSpin(true);
    let data = {
      id: id,
      item: inputValue,
    };
    try {
      const result = await dispatch(editApointAddress(data));
      if (result?.payload?.data?.success) {
        setSpin(false);
        toast.success(result.payload.data.message);
        closeEditAddressForm();
      } else {
        setSpin(false);
        toast.warning(result.payload.message);
      }
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };
  return (
    <div className={`w-full h-auto sm:p-4  ${isDarkEnabled ? "" : "sm:border"}`}>
      <p className="font-semibold text-sm">EDIT ADDRESS</p>
      <form
        onSubmit={hadleSubmitForm}
        className="w-full lg:w-2/3 flex flex-col gap-2"
      >
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="name" className="text-slate-400 text-sm">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={inputValue.name}
              onChange={handleInputChange}
              placeholder="Full name"
              className={`outline-none h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}
              style={{ background: colors.primary }}
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="phone" className="text-slate-400 text-sm">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              value={inputValue.phone}
              onChange={handleInputChange}
              type="text"
              placeholder="10 digit phone number"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}

              style={{ background: colors.primary }}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="start" className="text-slate-400 text-sm">
              Visiting Start Time
            </label>
            <input
              id="start"
              name="startTime"
              value={inputValue.startTime}
              onChange={handleInputChange}
              type="time"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}

              style={{ background: colors.primary }}
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="end" className="text-slate-400 text-sm">
              Visiting End Time
            </label>
            <input
              id="end"
              name="endTime"
              value={inputValue.endTime}
              onChange={handleInputChange}
              type="time"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}

              style={{ background: colors.primary }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="clinic" className="text-slate-400 text-sm">
              Clinic Name
            </label>
            <input
              id="clinic"
              type="text"
              name="clinicName"
              value={inputValue.clinicName}
              onChange={handleInputChange}
              placeholder="Enter your clinic name"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}

              style={{ background: colors.primary }}
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="pin" className="text-slate-400 text-sm">
              PIN Code
            </label>
            <input
              id="pin"
              name="zipCode"
              value={inputValue.zipCode}
              onChange={handleInputChange}
              type="text"
              placeholder="PIN Code"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}

              style={{ background: colors.primary }}
            />
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="locality" className="text-slate-400 text-sm">
              Locality
            </label>
            <input
              id="locality"
              name="locality"
              value={inputValue.locality}
              onChange={handleInputChange}
              type="text"
              placeholder="Locality"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}

              style={{ background: colors.primary }}
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="limit" className="text-slate-400 text-sm">
              Visiting Limit
            </label>
            <input
              id="limit"
              name="limitUser"
              value={inputValue.limitUser}
              onChange={handleInputChange}
              type="text"
              placeholder="Enter number of visiting"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}
              style={{ background: colors.primary }}
            />
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="address" className="text-slate-400 text-sm">
            Address (Area and Street)
          </label>
          <textarea
            name="address"
            value={inputValue.address}
            onChange={handleInputChange}
            id="address"
            className={`w-full outline-none  rounded-md p-4 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}
            style={{ background: colors.primary }}
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="dist" className="text-slate-400 text-sm">
              City/District/Town {inputValue.city}
            </label>
            <input
              id="dist"
              name="city"
              value={inputValue.city}
              onChange={handleInputChange}
              type="text"
              placeholder="City/District/Town"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}

              style={{ background: colors.primary }}
            />
          </div>
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="state" className="text-slate-400 text-sm">
              State
            </label>
            <input
              id="state"
              name="state"
              value={inputValue.state}
              onChange={handleInputChange}
              type="text"
              placeholder="State Name"
              className={`outline-none  h-12 w-full rounded-md px-2  ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}

              style={{ background: colors.primary }}
            />
          </div>
        </div>
        <div className="my-4">
          <button type="submit" className="px-8 rounded-md py-2 bg-[#006afe] text-white">
            {spin ? <CircularProgress color="white" size={18} /> : "SUBMIT"}
          </button>
          <button
            className="px-4 text-[#006afe]"
            onClick={closeEditAddressForm}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditApointmentAddress;
