import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EditUpiDetails } from "../../redux/slice/addUpiDetailSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const UpiEditForm = ({ closeForm, data }) => {
  const dispatch = useDispatch();
  const [upi, setUpi] = useState(data ? data.upi : "");
  const [spin, setSpin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSpin(true);
      let payloadData = {
        id:data._id,
        upi
      }
      const result = await dispatch(EditUpiDetails(payloadData));
      if (result.payload?.data?.success) {
        toast.success(result.payload.data.message);
        setSpin(false);
        closeForm();
      } else {
        toast.warning(result.payload.message);
        setSpin(false);
      }
    } catch (error) {
      console.log(error);
      setSpin(false);
    }
  };
  return (
    <div className="w-full">
      <div className="mb-2">
        <p className="text-[#006afe] text-sm font-semibold">EDIT UPI</p>
      </div>
      <hr />

      <div className="bg-[#f5faff] p-4 w-full">
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-2/3 flex flex-col gap-3"
        >
          <div className="w-full">
            <label htmlFor="upi" className="text-sm text-slate-400">
              UPI ID
            </label>
            <input
              id="upi"
              name="upi"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
              type="text"
              placeholder="UPI ID"
              required
              className="h-12 w-full outline-blue-600 border border-slate-300 px-4"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-sm text-white bg-[#006afe] font-bold px-8 py-4"
            >
              {spin ? <CircularProgress /> : " SUBMIT"}
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

export default UpiEditForm;
