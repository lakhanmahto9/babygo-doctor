import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddDoctor } from "../../redux/slice/doctorSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useThemeColors } from "../../utils/useThemeColor";

const AddDoctorForm = ({ closeDoctorForm }) => {
//   const doctor = useSelector((state) => state.doctor?.address || []);
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const [spin, setSpin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    // clinicId: doctor[0]._id,
    name: "",
    phone: "",
    phoneHide: false,
    email: "",
    emailHide: false,
    registrationNumber: "",
    zipCode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    degree: "",
    experience: "",
    expertise: "",
    expertiseHide: false,
    schedules: [
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

  const handleToggleVisibility = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    try {
      const result = await dispatch(AddDoctor(formData));
      console.log(result.payload);
      if (result.payload?.data?.success) {
        setSpin(false);
        toast.success(result.payload.data.message);
        closeDoctorForm();
      } else {
        setSpin(false);
        toast.error(result.payload.message);
      }
    } catch (error) {
      setSpin(false);
      console.log(error);
    }
  };
  return (
    <div className={`w-full border p-4 ${isDarkEnabled ? "border-gray-600" : ""}`}>
      <p className="text-sm font-semibold">ADD NEW DOCTOR</p>
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
            />
             <div
              className="absolute bottom-0 right-0 text-xs rounded-r-md bg-blue-500 h-12 flex justify-center items-center px-2 text-white cursor-pointer"
              onClick={() => handleToggleVisibility("phoneHide")}
            >
              {formData.phoneHide ? "Hide" : "Visible"}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
            />
             <div
              className="absolute bottom-0 right-0 text-xs rounded-r-md bg-blue-500 h-12 flex justify-center items-center px-2 text-white cursor-pointer"
              onClick={() => handleToggleVisibility("emailHide")}
            >
              {formData.emailHide ? "Hide" : "Visible"}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <p className="font-bold">Address Information</p>
          {/* <div className="w-auto bg-slate-400 rounded-lg px-2 text-white cursor-pointer">
            <small>Hide</small>
          </div> */}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
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
            className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
            style={{ background: colors.secondbackground }}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
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
            className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
            style={{ background: colors.secondbackground }}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
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
              className={`h-12 px-4 w-full rounded-md outline-blue-500 ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-500"}`}
              style={{ background: colors.secondbackground }}
            />
              <div
              className="absolute bottom-0 right-0 text-xs rounded-r-md bg-blue-500 h-12 flex justify-center items-center px-2 text-white cursor-pointer"
              onClick={() => handleToggleVisibility("expertiseHide")}
            >
              {formData.expertiseHide ? "Hide" : "Visible"}
            </div>
          </div>
        </div>
        <p className="font-bold">Appointment schedule</p>
        {formData.schedules.map((schedule, index) => (
          <div key={index} className={`p-4 rounded-md border ${isDarkEnabled ? "border-gray-600" : "bg-blue-50 "}`}>
            <div>
              <label htmlFor="info">Doctor's Information*</label>
              <textarea
                required
                id="info"
                type="text"
                name="doctorInfo"
                value={schedule.doctorInfo}
                onChange={(e) => handleScheduleChange(e, index, "doctorInfo")}
                className={`p-4 w-full border rounded-md outline-blue-500 ${isDarkEnabled ? "border-gray-600" : ""}`}
                style={{ background: colors.secondbackground }}
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <div className="w-full sm:w-1/2">
                <label>Select Days*</label>
                <div
                  className={`w-full px-4 py-2 border rounded-md cursor-pointer ${isDarkEnabled ? "border-gray-600" : ""}`}
                  onClick={() => setIsOpen(isOpen === index ? null : index)}
                  style={{ background: colors.secondbackground }}
                >
                  {schedule.selectedDays.length > 0
                    ? schedule.selectedDays.join(", ")
                    : "Select Days"}
                </div>

                {isOpen === index && (
                  <div className={`border rounded-md shadow-lg z-10 ${isDarkEnabled ? "border-gray-600" : ""}`}
                    style={{ background: colors.secondbackground }}
                  >
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
                    className={`h-10 w-full border rounded-md outline-blue-500 ${isDarkEnabled ? "border-gray-600" : ""}`}
                    style={{ background: colors.secondbackground }}
                  />
                </div>
                <div className="w-full">
                  <label>End Time*</label>
                  <input
                    required
                    type="time"
                    value={schedule.endTime}
                    onChange={(e) => handleScheduleChange(e, index, "endTime")}
                    className={`h-10 w-full border rounded-md outline-blue-500 ${isDarkEnabled ? "border-gray-600" : ""}`}
                    style={{ background: colors.secondbackground }}
                  />
                </div>
              </div>
            </div>
            {formData.schedules.length > 1 && (
              <button
                type="button"
                className={` px-4 py-2 my-2 rounded-md border ${isDarkEnabled ? "bg-[#040836] border-gray-600" : "bg-red-100"}`}
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
            {spin ? <CircularProgress size={18} color="white" /> : "SAVE"}
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
    </div>
  );
};

export default AddDoctorForm;
