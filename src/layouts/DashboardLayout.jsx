/* eslint-disable no-unused-vars */
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="relative min-h-screen md:flex ">
      {/*Sidebar*/}

      <Sidebar />

      <div className="flex-1 md:ml-64 p-4">
        <Outlet />
      </div>
      {/*Outlet --> Dynamic Content */}
    </div>
  );
};

export default DashboardLayout;
