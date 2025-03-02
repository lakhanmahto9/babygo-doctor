import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBankDetails } from "../../redux/slice/addBankDetailSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { useThemeColors } from "../../utils/useThemeColor";

const AddBankForm = ({ closeForm }) => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled)
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({
    name: "",
    branchName: "",
    bankName: "",
    ifscCode: "",
    accountNumber: "",
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
      const result = await dispatch(AddBankDetails(inputValue));
      console.log(result.payload);
      if (result.payload?.data?.success) {
        setSpin(false);
        toast.success(result.payload.data.message);
        closeForm();
      } else {
        toast.warning(result.payload.message);
        setSpin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full">
      <div className="p-4">
        <p className="text-[#006afe] text-sm font-semibold">
          ADD NEW BANK DETAILS
        </p>
      </div>
      {/* <hr /> */}
      <div className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}></div>

      <div className={`p-4 w-full ${isDarkEnabled ? "bg-[#040836]" : "bg-[#f5faff]"}`}>
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
                required
                type="text"
                placeholder="Holder Name"
                className={`h-12 w-full outline-blue-600 border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300"}`}
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
                className={`h-12 w-full outline-blue-600 border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300"}`}
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
                type="text"
                placeholder="Branch Name"
                required
                className={`h-12 w-full outline-blue-600 border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300"}`}
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
                placeholder="IFSC Code"
                required
                className={`h-12 w-full outline-blue-600 border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300"}`}
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
              className={`h-12 w-full outline-blue-600 border px-4 ${isDarkEnabled ? "border-gray-600" : "border-slate-300"}`}
              style={{ background: colors.background }}
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-sm text-white bg-[#006afe] rounded-md font-bold px-8 py-4"
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

export default AddBankForm;
