import React, { useState } from "react";
import BankHome from "./BankHome";
import { AddIcon } from "../../assets/icons/Icons";
import AddBankForm from "./AddBankForm";

const Addbank = () => {
  const [open, setOpen] = useState(false);
  const openAddBankForm = () => {
    setOpen(true);
  };
  const closeForm = () =>{
    setOpen(false);
  }
  return (
    <BankHome>
      <div className="w-full border rounded-sm p-4">
        <p className="font-semibold text-slate-500 mb-4">Manage Bank Details</p>
        {!open ? (
          <div
            onClick={openAddBankForm}
            className="p-4 flex items-center gap-4 cursor-pointer border"
          >
            <AddIcon color="#006afe" width="18" height="18" />{" "}
            <p className="text-sm font-bold text-[#006afe]">ADD NEW BANK DETAILS</p>
          </div>
        ) : (
          <div className="w-full border">
            <AddBankForm closeForm={closeForm}/>
          </div>
        )}
      </div>
    </BankHome>
  );
};

export default Addbank;
