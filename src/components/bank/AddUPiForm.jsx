import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUpiDetails } from "../../redux/slice/addUpiDetailSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useThemeColors } from "../../utils/useThemeColor";

const AddUPiForm = ({closeForm}) => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const dispatch = useDispatch();
  const [upi, setUpi] = useState("");
  const [spin, setSpin] = useState(false);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      setSpin(true);
      const result = await dispatch(AddUpiDetails({upi}));
      if(result.payload?.data?.success){
        toast.success(result.payload.data.message);
        setSpin(false);
        closeForm();
      }else{
        toast.warning(result.payload.message);
        setSpin(false);
      }
    } catch (error) {
      console.log(error)
      setSpin(false);
    }
  }
  return (
    <div className="w-full">
      <div className="p-4">
        <p className="text-[#006afe] text-sm font-semibold">
          ADD NEW UPI
        </p>
      </div>
      {/* <hr /> */}
       <div className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}></div>
      <div className={`p-4 w-full ${isDarkEnabled ? "" : "bg-[#f5faff]"}`}>
        <form onSubmit={handleSubmit} className="w-full sm:w-2/3 flex flex-col gap-3">
          <div className="w-full">
            <label htmlFor="upi" className="text-sm text-slate-400">
              UPI ID
            </label>
            <input
              id="upi"
              name="upi"
              value={upi}
              onChange={(e)=>setUpi(e.target.value)}
              type="text"
              placeholder="UPI ID"
              required
              className={`h-12 w-full outline-blue-600 border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300"}`}
              style={{background:colors.primary}}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-sm text-white bg-[#006afe] rounded-md font-bold px-8 py-4"
            >
              {spin? <CircularProgress /> :" SUBMIT"}
            </button>
            <button
              onClick={closeForm}
              type="button"
              className="text-sm text-[#006afe] font-bold px-8 py-4"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUPiForm;
