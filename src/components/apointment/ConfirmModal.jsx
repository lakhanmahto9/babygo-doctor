import { CircularProgress, Dialog } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChangeStatusApointment } from "../../redux/slice/getBookApointmentSlice";
import { useThemeColors } from "../../utils/useThemeColor";

const ConfirmModal = ({ id, open, handleClose }) => {
  const dispatch = useDispatch();
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const [spin, setSpin] = useState(false);
  const submit = async () => {
    try {
      let data = {
        id:id,
        status:"Done"
      }
      setSpin(true);
      const result = await dispatch(ChangeStatusApointment(data));
      console.log(result.payload);
      if (result.payload?.data?.success) {
        handleClose();
        setSpin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <div className="w-auto p-4" style={{background:colors.background,color:colors.text}}>
        <div className="py-4">
          <p className="text-sm font-semibold">
            Are you sure this treatment has been completed?
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={submit}
            className={`px-4 py-2 text-white font-bold ${isDarkEnabled ? "bg-[#040836]" : "bg-[#006afe]"}`}
          >
            {spin?<CircularProgress size={18} color="white"/>: "CONFIRM"}
          </button>
          <button onClick={handleClose} className="font-bold text-red-500">
            CANCEL
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
