import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addApointAddress } from "../../redux/slice/addMultipleAddressSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const ApointmentForm = ({ closeAddressForm }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    name: "",
    phone: "",
    startTime: "",
    endTime: "",
    clinicName: "",
    zipCode: "",
    locality: "",
    limitUser: "",
    address: "",
    city: "",
    state: "",
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
    try {
      const result = await dispatch(addApointAddress(inputValue));
      console.log(result.payload);
      if (result?.payload?.data?.success) {
        setSpin(false);
        toast.success(result.payload.data.message);
        closeAddressForm();
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
    <div className="w-full h-auto p-4 border">
      <p className="font-semibold text-sm">ADD NEW ADDRESS</p>
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
              className="outline-none border-2 h-12 w-full rounded-md px-2 border-slate-400"
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
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
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
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
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
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
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
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
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
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
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
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
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
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
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
            className="w-full outline-none border-2 border-slate-400 rounded-md p-4"
          />
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/2 flex flex-col">
            <label htmlFor="dist" className="text-slate-400 text-sm">
              City/District/Town
            </label>
            <input
              id="dist"
              name="city"
              value={inputValue.city}
              onChange={handleInputChange}
              type="text"
              placeholder="City/District/Town"
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
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
              className="outline-none border-2 h-12 w-full px-2 rounded-md border-slate-400"
            />
          </div>
        </div>
        <div className="my-4">
          <button type="submit" className="px-8 py-2 bg-[#9e78ce] text-white">
            {spin?<CircularProgress color="white" size={18}/>:"SUBMIT"}
          </button>
          <button className="px-4 text-[#9e78ce]" onClick={closeAddressForm}>
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApointmentForm;
