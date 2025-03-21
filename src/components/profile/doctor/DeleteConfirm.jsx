import { CircularProgress, Dialog } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { DeleteDoctorDetails } from "../../../redux/slice/doctorSlice";

const DeleteConfirm = ({ open, id, closeModal }) => {
  const dispatch = useDispatch();
  const [spin, setSpin] = useState(false);
  const handleClick = async () => {
    setSpin(true);
    // try {
    //   const result = await dispatch(DeleteDoctorDetails(id));
    //   if (result.payload?.data?.data?.success) {
    //     setSpin(false);
    //     toast.success(result.payload.data.data.message);
    //     closeModal();
    //   } else {
    //     setSpin(false);
    //     toast.warning(result.payload.message);
    //   }
    // } catch (error) {
    //   setSpin(false);
    //   console.log(error);
    // }
  };

  return (
    <Dialog open={open} onClose={closeModal}>
      <div className="w-full h-auto p-4">
        <p className="font-bold">
          Are you sure want to delete this information?
        </p>
        <div className="flex flex-row gap-4 mt-8">
          <button
            type="submit"
            onClick={handleClick}
            className="bg-blue-500 px-4 py-2 text-white"
          >
            {spin ? (
              <div className="flex gap-2 justify-center items-center">
                {" "}
                <CircularProgress color="white" size={18} /> Wait...
              </div>
            ) : (
              "CONFIRM"
            )}
          </button>
          <button type="button" onClick={closeModal} className="text-blue-500">
            CANCEL
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteConfirm;
