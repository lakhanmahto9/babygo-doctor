import { CircularProgress, Dialog } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ChangeStatusApointment } from "../../redux/slice/getBookApointmentSlice";
import { CrossIcon } from "../../assets/icons/Icons";

const AcceptModal = ({ id, status, open, handleClose }) => {
  console.log(status);
  const dispatch = useDispatch();
  const [spin, setSpin] = useState(false);
  const submit = async (status) => {
    try {
      let data = {
        id: id,
        status: status,
      };
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
      <div className="w-auto p-4 flex flex-col gap-2">
        <div className="flex justify-end" onClick={handleClose}>
          <CrossIcon color="#ff0000" width="18" height="18" />
        </div>
        <div className="py-4">
          <p className="text-sm font-semibold">
            {`Are you sure you want to ${status==="Deny" || status === "Pending"?"accept?":"or deny?"}`}
          </p>
        </div>
        <div className="flex gap-4 w-full">
          {(status === "Deny" || status === "Pending") && (
            <button
              onClick={() => submit("Accept")}
              className="px-4 py-2 w-full bg-green-500 text-white font-bold"
            >
              {spin ? <CircularProgress size={18} color="white" /> : "ACCEPT"}
            </button>
          )}
          {status === "Pending" && (
            <button
              onClick={() => submit("Deny")}
              className="px-4 py-2 w-full bg-red-500 text-white font-bold"
            >
              {spin ? <CircularProgress size={18} color="white" /> : "DENY"}
            </button>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default AcceptModal;
