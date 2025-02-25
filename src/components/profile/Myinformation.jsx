import React, { useRef, useState } from "react";
import Profile from "./Profile";
import { AddIcon } from "../../assets/icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileInformation } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useThemeColors } from "../../utils/useThemeColor";

const Myinformation = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const profileInputRef = useRef(null);
  const aadhaar_cardInputRef = useRef(null);
  const user = useSelector((state)=>state.auth?.user?.data)
  const [spin, setSpin] = useState(false);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    profile_pic: user?.profile_pic || null,
    profile_pic_preview: user?.profile_pic || null,
    aadhaar_card: user?.aadhaar_card || null,
    aadhaar_card_preview: user?.aadhaar_card || null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddClick = (type) => {
    if (type === "profile_pic") profileInputRef.current?.click();
    if (type === "aadhaar_card") aadhaar_cardInputRef.current?.click();
  };

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setInputValue((prev) => ({
        ...prev,
        [type]: file,
        [`${type}_preview`]: imageUrl,
      }));
    }
  };

  const handleRemoveImage = (type) => {
    setInputValue((prev) => ({
      ...prev,
      [type]: null,
    }));
    if (type === "profile_pic") profileInputRef.current.value = "";
    if (type === "aadhaar_card") aadhaar_cardInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    try {
      const formData = new FormData();
    Object.keys(inputValue).forEach((key) => {
      if (inputValue[key]) {
        formData.append(key, inputValue[key]);
      }
    });
    const result = await dispatch(updateProfileInformation(formData));
    console.log(result.payload);
    if(result.payload?.data?.success){
      setSpin(false)
      toast.success(result.payload.data.message);
    }else{
      setSpin(false)
      toast.warning(result.payload.message);
    }
    } catch (error) {
      setSpin(false)
      console.log(error);
    }
  };

  return (
    <Profile>
      <div className={` w-full rounded-md border ${isDarkEnabled ? "border-gray-600" : ""}`} style={{background:colors.background,color:colors.text}}>
        <div className={`p-4 border-b ${isDarkEnabled ? "border-gray-600" : ""}`}>
          <p className="font-bold">Add Information</p>
        </div>
        <form onSubmit={handleSubmit} className="p-4 w-full md:w-2/3 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row w-full gap-4">
            <div className="w-full">
              <label htmlFor="name" className="text-slate-400">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter full name"
                value={inputValue.name}
                onChange={handleInputChange}
                className={`rounded-md w-full h-12 outline-none px-2 ${isDarkEnabled ? "border border-gray-600" :"border-2 border-slate-400"}`}
                style={{background:colors.secondCardBg}}
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone" className="text-slate-400">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="Enter 10-digit number"
                value={inputValue.phone}
                onChange={handleInputChange}
                className={`rounded-md w-full h-12 outline-none px-2 ${isDarkEnabled ? "border border-gray-600" :"border-2 border-slate-400"}`}
                style={{background:colors.secondCardBg}}
              />
            </div>
          </div>
          <div className="w-full">
            <select
              name="gender"
              value={inputValue.gender}
              onChange={handleInputChange}
              className={`w-full rounded-md h-12 my-2 text-slate-400 outline-none ${isDarkEnabled ? "border border-gray-600" : "border-2 border-slate-400"}`}
              style={{background:colors.secondCardBg}}

            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-4 items-center mt-2">
            <div className="w-full sm:w-1/2">
              <p className="text-slate-400">Profile Picture</p>
              <div className="h-12 border border-slate-400 rounded-md flex justify-center items-center">
                {!inputValue.profile_pic ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleAddClick("profile_pic")}
                  >
                    <AddIcon color="#AABBCC" width="24" height="24" />
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
                      onClick={() => handleAddClick("profile_pic")}
                    >
                      Change
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
                      onClick={() => handleRemoveImage("profile_pic")}
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept=".jpg,.png"
                  ref={profileInputRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "profile_pic")}
                />
              </div>
            </div>
            <div className="border border-slate-400 h-36 rounded-2xl w-full sm:w-1/2 flex flex-col justify-center items-center">
              {inputValue.profile_pic ? (
                <img
                  src={inputValue.profile_pic_preview}
                  alt="Profile Preview"
                  className="h-24 w-24 rounded-full object-fill"
                />
              ) : (
                <div className="border border-dashed border-slate-400 h-24 w-24 rounded-full"></div>
              )}
              <p className="text-slate-400">
                {inputValue.profile_pic ? "Selected Image" : "Preview Image"}
              </p>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-4 items-center mt-2">
            <div className="w-full sm:w-1/2">
              <p className="text-slate-400">Aadhaar Card</p>
              <div className="h-12 border border-slate-400 rounded-md flex justify-center items-center">
                {!inputValue.aadhaar_card ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => handleAddClick("aadhaar_card")}
                  >
                    <AddIcon color="#AABBCC" width="24" height="24" />
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md"
                      onClick={() => handleAddClick("aadhaar_card")}
                    >
                      Change
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-md"
                      onClick={() => handleRemoveImage("aadhaar_card")}
                    >
                      Remove
                    </button>
                  </div>
                )}
                <input
                  type="file"
                  accept=".jpg,.png"
                  ref={aadhaar_cardInputRef}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, "aadhaar_card")}
                />
              </div>
            </div>
            <div className="border-2 border-slate-400 h-36 w-full sm:w-1/2 rounded-2xl flex flex-col justify-center items-center">
              {inputValue.aadhaar_card ? (
                <img
                  src={inputValue.aadhaar_card_preview}
                  alt="ID Card Preview"
                  className="h-full w-full rounded-2xl object-fill"
                />
              ) : (
                <div className="border border-dashed border-slate-400">
                  Preview
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className={`px-10 py-2 border rounded-md my-4 shadow-md  text-white ${isDarkEnabled ? "bg-[#040836] border-gray-600" : "bg-[#9e78ce]"}`}
          >
            {spin?<CircularProgress color="white" size={18}/>: "SUBMIT"}
          </button>
        </form>
      </div>
    </Profile>
  );
};

export default Myinformation;
