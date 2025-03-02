import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditBankDetails } from "../../redux/slice/addBankDetailSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useThemeColors } from "../../utils/useThemeColor";

const EditBank = ({ closeForm, data }) => {
  // console.log(data)
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    name: data.name || "",
    branchName: data.branchName || "",
    bankName: data.bankName || "",
    ifscCode: data.ifscCode || "",
    accountNumber: data.accountNumber || "",
  });
  const [spin, setSpin] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSpin(true);
    try {
      let payloadData = {
        id: data._id,
        value: inputValue
      }
      const result = await dispatch(EditBankDetails(payloadData));
      console.log(result.payload);
      if (result.payload?.data?.success) {
        setSpin(false);
        toast.success(result.payload.data.message);
        closeForm();
      } else {
        setSpin(false)
        toast.warning(result.payload.message);
      }
    } catch (error) {
      setSpin(false)
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <p>Edit Bank Details</p>
      <div className={`p-4 my-4 ${isDarkEnabled ? "" : "border bg-[#f5faff]"}`}>
        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-2/3 flex flex-col gap-3"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label htmlFor="holder" className="text-sm text-slate-400">
                Holder Name
              </label>
              <input
                id="holder"
                name="name"
                value={inputValue.name}
                onChange={handleInputChange}
                type="text"
                placeholder="Holder Name"
                required
                className={`h-12 w-full  border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300 outline-blue-600"}`}
                style={{ background: colors.background }}
              />
            </div>
            <div>
              <label htmlFor="bankname" className="text-sm text-slate-400">
                Bank Name
              </label>
              <input
                id="bankname"
                name="bankName"
                value={inputValue.bankName}
                onChange={handleInputChange}
                required
                type="text"
                placeholder="Bank Name"
                className={`h-12 w-full  border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300 outline-blue-600"}`}
                style={{ background: colors.background }}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label htmlFor="branch" className="text-sm text-slate-400">
                Branch Name
              </label>
              <input
                id="branch"
                name="branchName"
                value={inputValue.branchName}
                onChange={handleInputChange}
                required
                type="text"
                placeholder="Branch Name"
                className={`h-12 w-full  border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300 outline-blue-600"}`}
                style={{ background: colors.background }}
              />
            </div>
            <div>
              <label htmlFor="ifsc" className="text-sm text-slate-400">
                IFSC Code
              </label>
              <input
                id="ifsc"
                type="text"
                name="ifscCode"
                value={inputValue.ifscCode}
                onChange={handleInputChange}
                required
                placeholder="IFSC Code"
                className={`h-12 w-full  border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300 outline-blue-600"}`}
                style={{ background: colors.background }}
              />
            </div>
          </div>
          <div className="w-full">
            <label htmlFor="account" className="text-sm text-slate-400">
              Account Number
            </label>
            <input
              id="account"
              type="text"
              name="accountNumber"
              value={inputValue.accountNumber}
              onChange={handleInputChange}
              placeholder="Account Number"
              required
              className={`h-12 w-full  border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300 outline-blue-600"}`}
              style={{ background: colors.background }}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-sm text-white bg-[#006afe] font-bold rounded-md px-8 py-4"
            >
              {spin ? <CircularProgress color="white" size={18} /> : "SUBMIT"}
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

export default EditBank;
