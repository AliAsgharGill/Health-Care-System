import AppointmentInfo from "@/components/appointmentInfo/page";
import { DashboardTable } from "@/components/dashoardTable/page";
import Nav from "@/components/nav/page";
import React from "react";

const Dashboard = () => {
  return (
    <>
      <Nav />
      <div className="flex w-1/3 flex-col justify md:ml-10 md:p-16  ">
        <div>
          <h1 className="text-4xl text-white font-bold mt-10 ">
            Welcome, Admin
          </h1>
          <p className="text-gray-50  w-full text-lg mt-8 ">
            Start day with managing new appointments{" "}
          </p>
        </div>
      </div>
      <AppointmentInfo />
      <div className="flex justify-evenly items-center  m-20">
        <DashboardTable />
      </div>
    </>
  );
};

export default Dashboard;
