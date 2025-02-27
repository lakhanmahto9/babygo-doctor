import React, { useState } from "react";
import BankHome from "./BankHome";
import AddUPiForm from "./AddUPiForm";
import { AddIcon, VerticalThreeDotIcon } from "../../assets/icons/Icons";
import { useSelector } from "react-redux";
import { Button, Menu, MenuItem } from "@mui/material";
import UpiEditForm from "./UpiEditForm";

const Addupi = () => {
  const upi = useSelector((state)=> state.upi?.upi || []);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBankId, setSelectedBankId] = useState("");
  const [menuBankId, setMenuBankId] = useState(null);
  const openAddBankForm = () => {
    setOpen(true);
  };
  const closeForm = () => {
    setOpen(false);
    setSelectedBankId("")
  };
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuBankId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuBankId(null);
  };

  const openEditForm = (id) => {
    handleClose();
    setSelectedBankId(id);
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
            <p className="text-sm font-bold text-[#006afe]">ADD NEW UPI</p>
          </div>
        ) : (
          <div className="w-full border">
            <AddUPiForm closeForm={closeForm} />
          </div>
        )}
        <div className="w-full border my-4">
          {upi &&
            upi.length > 0 &&
            upi.map((item) => (
              <div key={item._id} className="border p-4">
                {item._id !== selectedBankId ? (
                  <div className="flex w-full">
                    <div className="w-4/5">
                      <p className="text-xs text-slate-600">
                        Account number : {item.upi}
                      </p>
                    </div>
                    <div className="w-1/5 flex justify-end cursor-pointer">
                      <Button
                        onClick={(e) => handleClick(e, item._id)}
                        aria-controls={
                          menuBankId === item._id ? "basic-menu" : undefined
                        }
                        aria-haspopup="true"
                        aria-expanded={
                          menuBankId === item._id ? "true" : undefined
                        }
                      >
                        <VerticalThreeDotIcon
                          color="#000"
                          width="18"
                          height="18"
                        />
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={menuBankId === item._id ? anchorEl : null}
                        open={menuBankId === item._id}
                        onClose={handleClose}
                        MenuListProps={{ "aria-labelledby": "basic-button" }}
                      >
                        <MenuItem onClick={() => openEditForm(item._id)}>
                          Edit
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                      </Menu>
                    </div>
                  </div>
                ) : (
                  <UpiEditForm closeForm={closeForm} data={item} />
                )}
              </div>
            ))}
        </div>
      </div>
    </BankHome>
  );
};

export default Addupi;
