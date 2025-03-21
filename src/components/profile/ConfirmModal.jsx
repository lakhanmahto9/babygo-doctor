import { CircularProgress, Dialog } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EditClinicInfo } from "../../../redux/slice/addMultipleAddressSlice";
import { toast } from "react-toastify";

const ConfirmModal = ({ open, data, handleClose }) => {
  const dispatch = useDispatch();
  const [spin, setSpin] = useState(false);
  const handleClick = async () => {
    try {
      const result = await dispatch(EditClinicInfo(data));
      if (result?.payload?.data?.success) {
        setSpin(false);
        toast.success(result.payload.data.message);
        handleClose();
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
    <Dialog open={open} onClose={handleClose}>
      <div className="w-full h-auto p-4">
        <p className="font-bold">
          Are you sure want to update this information?
        </p>
        <div className="flex flex-row gap-4 mt-8">
          <button
            type="submit"
            onClick={handleClick}
            className="bg-blue-500 px-4 py-2 text-white"
          >
            {spin ?<div className="flex gap-2 justify-center items-center"> <CircularProgress color="white" size={18} /> Wait...</div> : "CONFIRM"}
          </button>
          <button type="button" onClick={handleClose} className="text-blue-500">
            CANCEL
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmModal;
