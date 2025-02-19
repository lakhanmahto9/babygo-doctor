import React from "react";
import Layout from "../layout/Layout";
import Header from "./Header";
import Benner from "./Benner";
import Cards from "./Cards";
import ApointmentAddress from "./ApointmentAddress";
import Information from "./Information";

const Dashboard = () => {
  return (
    <Layout>
      <div className="w-full flex">
        <div className="w-3/4 bg-[#fbf5ff] p-4 shadow-md">
          <Header/>
          <Benner/>
          <Cards/>
          <ApointmentAddress/>
        </div>
        <div className="w-1/4">
          <Information/>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
