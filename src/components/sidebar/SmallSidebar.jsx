import React from "react";

import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";
import { MenuIcon } from "../../assets/icons/Icons";
import { Box, Button, Drawer } from "@mui/material";

const SmallSidebar = () => {
  const [open, setOpen] = React.useState(false);
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: "100%" }} role="presentation" onClick={toggleDrawer(false)}>
      <Sidebar />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon color={colors.text} width="32" height="32" />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default SmallSidebar;
