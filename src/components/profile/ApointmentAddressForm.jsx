import React, { useEffect, useState } from "react";
import Profile from "./Profile";
import { AddIcon, VerticalThreeDotIcon } from "../../assets/icons/Icons";
import ApointmentForm from "./ApointmentForm";
import { useDispatch, useSelector } from "react-redux";
import { getApointAddress } from "../../redux/slice/addMultipleAddressSlice";
import { Button, Menu, MenuItem } from "@mui/material";
import EditApointmentAddress from "./EditApointmentAddress";
import { useThemeColors } from "../../utils/useThemeColor";

const ApointmentAddressForm = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled)
  const apointmentaddress = useSelector(
    (state) => state.apointmentaddress?.address || []
  );
  const dispatch = useDispatch();
  const [menuAnchor, setMenuAnchor] = useState({ id: null, anchor: null });
  const [openForm, setOpenform] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const closeForm = () => {
    setOpenform(false);
  };

  useEffect(() => {
    dispatch(getApointAddress());
  }, [dispatch]);

  const handleMenuClick = (event, id) => {
    setMenuAnchor({ id, anchor: event.currentTarget });
  };

  const handleMenuClose = () => {
    setMenuAnchor({ id: null, anchor: null });
  };
  const openEditApointment = (addressid) => {
    console.log(addressid);
    setSelectedId(addressid);
    handleMenuClose();
  };
  const closeEditForm = ()=>{
    setSelectedId(null)
  }
  return (
    <Profile>
      <div className={`w-full border rounded-md ${isDarkEnabled ? "border-gray-600" : ""}`} style={{background:colors.cardBg}}>
        <div className="p-4">
          <p className="font-bold">Manage Appointment Address</p>
        </div>
      <div className={`border-b ${isDarkEnabled ? "border-gray-600" : ""}`}></div>
        <div className="w-full p-4">
          {!openForm ? (
            <div
              onClick={() => setOpenform(true)}
              className={`w-full border flex justify-start items-center p-4 gap-4 cursor-pointer ${isDarkEnabled ? "border-gray-600" : ""}`}
            >
              <AddIcon color="#2892FC" width="20" height="20" />
              <p className="text-[#2892FC]">ADD NEW ADDRESS</p>
            </div>
          ) : (
            <ApointmentForm closeAddressForm={closeForm} />
          )}
        </div>
        <div className="p-4">
          <div className={`border ${isDarkEnabled ? "border-gray-600" :""}`}>
            {apointmentaddress.map((item, index) =>
              selectedId !== item._id ? (
                <div className={`w-full flex p-4 border-b ${isDarkEnabled ? "border-gray-600" : ""}`} key={index}>
                  <div className="w-4/5">
                    <p className="text-sm">
                      {item.address}, {item.locality}, {item.city}
                    </p>{" "}
                    <p className="text-sm font-semibold">
                      {item.state} - {item.zipCode}
                    </p>
                  </div>
                  <div className="w-1/5 flex justify-end cursor-pointer">
                    <Button
                      id={`menu-button-${item._id}`}
                      aria-controls={
                        menuAnchor.id === item._id ? "menu" : undefined
                      }
                      aria-haspopup="true"
                      onClick={(event) => handleMenuClick(event, item._id)}
                    >
                      <VerticalThreeDotIcon color={colors.text} width="18" height="18" />
                    </Button>

                    <Menu
                      id="menu"
                      anchorEl={menuAnchor.anchor}
                      open={menuAnchor.id === item._id}
                      onClose={handleMenuClose}
                      MenuListProps={{
                        "aria-labelledby": `menu-button-${item._id}`,
                      }}
                    >
                      <MenuItem onClick={() => openEditApointment(item._id)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                    </Menu>
                  </div>
                </div>
              ) : (
                <div className={`p-4 border ${isDarkEnabled ? "border-gray-600" : ""}`}>
                  <EditApointmentAddress
                    id={selectedId}
                    editaddress={item}
                    closeEditAddressForm={closeEditForm}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </Profile>
  );
};

export default ApointmentAddressForm;
