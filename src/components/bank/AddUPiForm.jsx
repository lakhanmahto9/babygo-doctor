import React from "react";

const AddUPiForm = ({closeForm}) => {
  return (
    <div className="w-full">
      <div className="p-4">
        <p className="text-[#006afe] text-sm font-semibold">
          ADD NEW UPI
        </p>
      </div>
      <hr />

      <div className="bg-[#f5faff] p-4 w-full">
        <div className="w-2/3 flex flex-col gap-3">
          <div className="w-full">
            <label htmlFor="upi" className="text-sm text-slate-400">
              UPI ID
            </label>
            <input
              id="upi"
              type="text"
              placeholder="UPI ID"
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
        </div>
      </div>
    </div>
  );
};

export default AddUPiForm;
