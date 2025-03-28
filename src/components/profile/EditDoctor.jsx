import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDoctor, EditDoctorInfo } from "../../redux/slice/doctorSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import DoctorConfirm from "./doctor/DoctorConfirm";
import { useThemeColors } from "../../utils/useThemeColor";

const EditDoctor = ({ id, editdoctor, closeDoctorForm }) => {
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const [spin, setSpin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  console.log(editdoctor);
  const [formData, setFormData] = useState({
    id: editdoctor._id,
    clinicId: id,
    name: editdoctor.name || "",
    phone: editdoctor.phone || "",
    phoneHide: editdoctor.phoneHide || false,
    email: editdoctor.email || "",
    emailHide: editdoctor.emailhide || false,
    registrationNumber: editdoctor.registrationNumber || "",
    zipCode: editdoctor.zipCode || "",
    locality: editdoctor.locality || "",
    address: editdoctor.address || "",
    city: editdoctor.city || "",
    state: editdoctor.state || "",
    degree: editdoctor.degree || "",
    experience: editdoctor.experience || "",
    expertise: editdoctor.expertise || "",
    expertiseHide: editdoctor.expertiseHide || false,
    schedules:
      editdoctor.schedules?.length > 0
        ? editdoctor.schedules.map((s) => ({
            doctorInfo: s.doctorInfo || "",
            selectedDays: s.selectedDays || [],
            startTime: s.startTime || "",
            endTime: s.endTime || "",
          }))
        : [
            {
              doctorInfo: "",
              selectedDays: [],
              startTime: "",
              endTime: "",
            },
          ],
  });
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSelect = (day, scheduleIndex) => {
    setFormData((prev) => {
      const updatedSchedules = prev.schedules.map((schedule, index) => {
        if (index === scheduleIndex) {
          return {
            ...schedule,
            selectedDays: schedule.selectedDays.includes(day)
              ? schedule.selectedDays.filter((d) => d !== day)
              : [...schedule.selectedDays, day],
          };
        }
        return schedule;
      });
      return { ...prev, schedules: updatedSchedules };
    });
  };

  const handleScheduleChange = (e, index, field) => {
    const { value } = e.target;
    setFormData((prev) => {
      const updatedSchedules = prev.schedules.map((schedule, i) =>
        i === index ? { ...schedule, [field]: value } : schedule
      );
      return { ...prev, schedules: updatedSchedules };
    });
  };

  const addMoreSchedule = () => {
    setFormData((prev) => ({
      ...prev,
      schedules: [
        ...prev.schedules,
        {
          selectedDays: [],
          startTime: "",
          endTime: "",
          doctorInfo: "",
        },
      ],
    }));
  };
  const handleRemoveSchedule = (index) => {
    setFormData((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

  const handleToggle = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    setOpen(true);
    try {
      // const result = await dispatch(EditDoctorInfo(formData));
      // if (result.payload?.data?.success) {
      //   setSpin(false);
      //   toast.success(result.payload.data.message);
      //   closeDoctorForm();
      // } else {
      //   setSpin(false);
      //   toast.error(result.payload.message);
      // }
    } catch (error) {
      setSpin(false);
    }
  };
  const handleClose = ()=>{
    setOpen(false);
    setSpin(false);
  }
  return (
    <div className={`w-full sm:border sm:p-4 ${isDarkEnabled ? "border-gray-600" : ""}`}>
      <p className="text-sm font-semibold">EDIT DOCTOR</p>
      <form
        onSubmit={handleSubmit}
        className="my-4 w-full md:w-3/4 flex flex-col gap-4"
      >
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="name">Name*</label>
            <input
              required
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
          </div>
          <div className="w-full sm:w-1/2 relative">
            <label htmlFor="tel">Phone*</label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
            <div
              className="absolute bottom-0 right-0 text-xs rounded-r-md bg-blue-500 h-12 flex justify-center items-center px-2 text-white cursor-pointer"
              onClick={() => handleToggle('phoneHide')}
            >
              {formData.phoneHide ? "Visible" : "Hide"}
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="w-full sm:w-1/2 relative">
            <label htmlFor="email">
              Email <small>(Optional)</small>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
           <div
              className="absolute bottom-0 right-0 text-xs rounded-r-md bg-blue-500 h-12 flex justify-center items-center px-2 text-white cursor-pointer"
              onClick={() => handleToggle('emailHide')}
            >
              {formData.emailHide ? "Visible" : "Hide"}
            </div>
          </div>
          <div className="w-full sm:w-1/2 relative">
            <label htmlFor="reg">Registration Number*</label>
            <input
              required
              id="res"
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">Address Information</p>
          <div className="w-auto bg-slate-400 rounded-lg px-2 text-white cursor-pointer">
            <small>Hide</small>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="pin">PIN Code*</label>
            <input
              required
              id="pin"
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
          </div>
          <div className="w-full sm:w-1/2 relative">
            <label htmlFor="locality">Locality*</label>
            <input
              required
              id="locality"
              type="text"
              name="locality"
              value={formData.locality}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
          </div>
        </div>
        <div>
          <label htmlFor="address">
            Address <small>(Area/Street)*</small>
          </label>
          <textarea
            required
            id="address"
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`p-4 w-full pl-2 border-2 rounded-md border-slate-500  ${isDarkEnabled ? "" : "outline-blue-500"}`}
            style={{background:colors.secondbackground}}
          />
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="city">City*</label>
            <input
              required
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
          </div>
          <div className="w-full sm:w-1/2 relative">
            <label htmlFor="state">State*</label>
            <input
              required
              id="state"
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
          </div>
        </div>
        <div>
          <label htmlFor="degree">Degree*</label>
          <textarea
            required
            id="degree"
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className={`p-4 w-full pl-2 border-2 rounded-md border-slate-500  ${isDarkEnabled ? "" : "outline-blue-500"}`}
            style={{background:colors.secondbackground}}
          />
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="w-full sm:w-1/2">
            <label htmlFor="experience">
              Experience <small>(Optional)</small>
            </label>
            <input
              id="experience"
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className={`h-12 px-4 pl-2 w-full border-2 rounded-md border-slate-500 ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
          </div>
          <div className="w-full sm:w-1/2 relative z-0">
            <label htmlFor="expertise">
              Expertise <small>(Optional)</small>
            </label>
            <input
              id="expertise"
              type="text"
              name="expertise"
              value={formData.expertise}
              onChange={handleChange}
              className={`h-12 pl-2 pr-12 w-full border-2 rounded-md border-slate-500  ${isDarkEnabled ? "" : "outline-blue-500"}`}
              style={{background:colors.secondbackground}}
            />
            <div
              className="absolute bottom-0 right-0 text-xs rounded-r-md bg-blue-500 h-12 flex justify-center items-center px-2 text-white cursor-pointer"
              onClick={() => handleToggle('expertiseHide')}
            >
              {formData.expertiseHide ? "Visible" : "Hide"}
            </div>
          </div>
        </div>
        <p className="font-bold">Appointment schedule</p>
        {formData.schedules.map((schedule, index) => (
          <div key={index} className={`p-4 rounded-md border ${isDarkEnabled ? "border-gray-600" : "bg-blue-50"}`}>
            <div>
              <label htmlFor="info">Doctor's Information*</label>
              <textarea
                required
                id="info"
                type="text"
                name="doctorInfo"
                value={schedule.doctorInfo}
                onChange={(e) => handleScheduleChange(e, index, "doctorInfo")}
                className={`p-4 w-full border rounded-md  ${isDarkEnabled ? "border-gray-600" : "outline-blue-500"}`}
                style={{background:colors.secondbackground}}
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="w-full sm:w-1/2">
                <label>Select Days*</label>
                <div
                  className={`w-full px-4 py-2 border rounded-md cursor-pointer ${isDarkEnabled ? "border-gray-600" : ""}`}
                  onClick={() => setIsOpen(isOpen === index ? null : index)}
                  style={{background:colors.secondbackground}}
                >
                  {schedule.selectedDays.length > 0
                    ? schedule.selectedDays.join(", ")
                    : "Select Days"}
                </div>

                {isOpen === index && (
                  <div className="bg-white border rounded-md shadow-lg z-10" style={{background:colors.secondbackground}} >
                    {days.map((day) => (
                      <div
                        key={day}
                        className={`p-2 cursor-pointer 
                            ${isDarkEnabled ? "hover:bg-[#1e293b]" : "hover:bg-blue-100"} 
                            ${schedule.selectedDays.includes(day)
                              ? isDarkEnabled
                                ? "bg-[#334155]"
                                : "bg-blue-200"
                              : ""}`
                          }
                        onClick={() => handleSelect(day, index)}
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Time Selection */}
              <div className="w-full sm:w-1/2 flex gap-2">
                <div className="w-full">
                  <label>Start Time*</label>
                  <input
                    type="time"
                    required
                    value={schedule.startTime}
                    onChange={(e) =>
                      handleScheduleChange(e, index, "startTime")
                    }
                    className={`h-10 w-full border rounded-md  ${isDarkEnabled ? "border-gray-600" : "outline-blue-500"}`}
                    style={{background:colors.secondbackground}}
                  />
                </div>
                <div className="w-full">
                  <label>End Time*</label>
                  <input
                    required
                    type="time"
                    value={schedule.endTime}
                    onChange={(e) => handleScheduleChange(e, index, "endTime")}
                    className={`h-10 w-full border rounded-md ${isDarkEnabled ? "border-gray-600" : "outline-blue-500"}`}
                    style={{background:colors.secondbackground}}
                  />
                </div>
              </div>
            </div>
            {formData.schedules.length > 1 && (
              <button
                type="button"
                className={`px-4 py-2 my-2 rounded-md border ${isDarkEnabled ? "border-gray-600" : "bg-red-100"}`}
                onClick={() => handleRemoveSchedule(index)}
              >
                CANCEL
              </button>
            )}
          </div>
        ))}
        <div className="flex justify-end">
          {" "}
          <button
            type="button"
            onClick={addMoreSchedule}
            className="border-blue-500 text-blue-500 w-32 font-semibold py-2 px-4 rounded-md border"
          >
            ADD MORE
          </button>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 w-32 font-semibold text-white py-2 px-4 rounded-md border"
          >
            SAVE
          </button>
          <button
            type="button"
            onClick={closeDoctorForm}
            className=" text-blue-500 w-32 font-semibold py-2 px-4 rounded-md"
          >
            CANCEL
          </button>
        </div>
      </form>
      <DoctorConfirm open={open} data={formData} handleClose={handleClose} />
    </div>
  );
};

export default EditDoctor;
