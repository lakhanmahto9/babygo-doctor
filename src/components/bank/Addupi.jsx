import React, { useState } from "react";
import BankHome from "./BankHome";
import AddUPiForm from "./AddUPiForm";
import { AddIcon } from "../../assets/icons/Icons";

const Addupi = () => {
  const [open, setOpen] = useState(false);
  const openAddBankForm = () => {
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
  };
  return (
    <BankHome>
      <div className="w-full border rounded-sm p-4">
        <p className="font-semibold text-slate-500 mb-4">Manage UPI Details</p>
        {!open ? (
          <div
            onClick={openAddBankForm}
            className="p-4 flex items-center gap-4 cursor-pointer border"
          >
            <AddIcon color="#006afe" width="18" height="18" />{" "}
            <p className="text-sm font-bold text-[#006afe]">
              ADD NEW UPI
            </p>
          </div>
        ) : (
          <div className="w-full border">
            <AddUPiForm closeForm={closeForm} />
          </div>
        )}
      </div>
    </BankHome>
  );
};

export default Addupi;
