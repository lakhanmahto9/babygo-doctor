import React from "react";
import Layout from "../layout/Layout";
import Header from "./Header";
import Benner from "./Benner";
import Cards from "./Cards";
import ApointmentAddress from "./ApointmentAddress";
import Information from "./Information";
import { useSelector } from "react-redux";
import { useThemeColors } from "../../utils/useThemeColor";

const Dashboard = () => {
  const isDarkEnabled = useSelector((state) => state.darkmode.dark);
  const colors = useThemeColors(isDarkEnabled);
  return (
    <Layout>
      <div className="w-full flex flex-col md:flex-row">
        <div
          className={`w-full md:w-3/4 p-4 shadow-md ${isDarkEnabled ? "bg-[#010844]" : ""}`}
          style={{ color: colors.text }}
        >
          <Header />
          <Benner />

          {/* Move Information below Banner only on small screens */}
          <div className="block md:hidden">
            <Information />
          </div>

          <Cards />
          {/* <ApointmentAddress /> */}
        </div>
        <div className="hidden md:block w-full md:w-1/4">
          <Information />
        </div>
      </div>

    </Layout>
  );
};

export default Dashboard;
