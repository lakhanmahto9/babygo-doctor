import React, { useEffect, useRef, useState } from "react";
import Profile from "./Profile";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress, Menu, MenuItem } from "@mui/material";
import { useThemeColors } from "../../utils/useThemeColor";
import { AddIcon, VerticalThreeDotIcon } from "../../assets/icons/Icons";
// import AddDoctorForm from "./AddDoctorForm";
import { GetDoctor } from "../../redux/slice/doctorSlice";
import EditDoctor from "./EditDoctor";
import DeleteConfirm from "./doctor/DeleteConfirm";
import AddDoctorForm from "./AddDoctorForm";

const Doctor = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const doctor = useSelector((state) => state.doctor?.doctor || []);
  const [menuAnchor, setMenuAnchor] = useState({ id: null, anchor: null });
  const dispatch = useDispatch();
  const colors = useThemeColors(isDarkEnabled);
  const [openForm, setOpenform] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [id, setId] = useState(null);
  const closeForm = () => {
    setOpenform(false);
  };

  useEffect(() => {
    dispatch(GetDoctor());
  }, []);

  const handleMenuClick = (event, id) => {
    setMenuAnchor({ id, anchor: event.currentTarget });
  };

  const handleMenuClose = () => {
    setMenuAnchor({ id: null, anchor: null });
  };
  const openEditDoctor = (addressid) => {
    setSelectedId(addressid);
    handleMenuClose();
  };

  const closeEditForm = () => {
    setSelectedId(null);
  };
  const closeDeleteModal = () => {
    console.log("close")
    setOpen(false);
    setId(null);
  };
  return (
    <Profile>
      <div
        className={`w-full rounded-md border ${
          isDarkEnabled ? "border-gray-600" : ""
        }`}
        style={{ background: colors.background }}
      >
        <div className="p-4">
          <p className="text-sm font-semibold"> Manage Doctor Information</p>
        </div>
        {/* <hr /> */}
        <div
          className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}
        ></div>
        {!doctor.length > 0 && (
        <div className="p-4 w-full">
          {!openForm ? (
            <div
              onClick={() => setOpenform(true)}
              className={`w-full border flex justify-start items-center p-4 gap-4 cursor-pointer ${
                isDarkEnabled ? "border-gray-600" : ""
              }`}
            >
              <AddIcon color="#2892FC" width="20" height="20" />
              <p className="text-[#2892FC]">ADD NEW DOCTOR</p>
            </div>
          ) : (
            <AddDoctorForm closeDoctorForm={closeForm} />
          )}
        </div>
        )}
        <div className="p-4">
          <div className={`border ${isDarkEnabled ? "border-gray-600" : ""}`}>
            {doctor.map((item, index) =>
              selectedId !== item._id ? (
                <div
                  className={`w-full flex p-4 border-b ${
                    isDarkEnabled ? "border-gray-600" : ""
                  }`}
                  key={index}
                >
                  <div className="w-4/5">
                    <p className="text-sm font-semibold">
                      {item.name}, {item.phone}
                    </p>{" "}
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
                      <VerticalThreeDotIcon
                        color={colors.text}
                        width="18"
                        height="18"
                      />
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
                      <MenuItem onClick={() => openEditDoctor(item._id)}>
                        Edit
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              ) : (
                <div
                  className={`p-4 border ${
                    isDarkEnabled ? "border-gray-600" : ""
                  }`}
                >
                  <EditDoctor
                    id={selectedId}
                    editdoctor={item}
                    closeDoctorForm={closeEditForm}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <DeleteConfirm open={open} id={id} closeModal={closeDeleteModal} />
    </Profile>
  );
};

export default Doctor;
