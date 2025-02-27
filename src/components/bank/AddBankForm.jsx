import React, { useState } from "react";

const AddBankForm = ({ closeForm }) => {
  const [inputValue, setInputValue] = useState({
    name: "",
    branchName: "",
    bankName: "",
    ifscCode: "",
    accountNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputValue);
  }
  return (
    <div className="w-full">
      <div className="p-4">
        <p className="text-[#006afe] text-sm font-semibold">
          ADD NEW BANK DETAIL
        </p>
      </div>
      <hr />

      <div className="bg-[#f5faff] p-4 w-full">
        <form onSubmit={handleSubmit} className="w-full sm:w-2/3 flex flex-col gap-3">
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
                className="h-12 w-full outline-blue-600 border border-slate-300 px-4"
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
                type="text"
                placeholder="Bank Name"
                className="h-12 w-full outline-blue-600 border border-slate-300 px-4"
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
                className="h-12 w-full outline-blue-600 border border-slate-300 px-4"
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
                className="h-12 w-full outline-blue-600 border border-slate-300 px-4"
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
              className="h-12 w-full outline-blue-600 border border-slate-300 px-4"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="text-sm text-white bg-[#006afe] font-bold px-8 py-4"
            >
              SUBMIT
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
