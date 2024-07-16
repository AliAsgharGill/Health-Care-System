import AppointmentForm from "@/components/appointmentForm/page";
import UserDetailForm from "@/components/userDetailForm/page";
import Image from "next/image";
import React from "react";

const Appointment = () => {
  return (
    <>
      <div className="flex justify-evenly min-h-screen">
        <div className="flex w-1/3 flex-col justify md:mt-24   ">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={200}
            height={200}
          />
          <h1 className="text-3xl text-white mt-10 mb-5 font-bold">
            Hey there 👋
          </h1>
          <p className="text-gray-300 text-lg">
            Request a new appointment in 10 seconds{" "}
          </p>
          {/* Appointment Form*/}
          <AppointmentForm />
        </div>
        <div className="flex justify-end items-end" >
          <Image
            src="/assets/images/appointmentPageImage.png"
            alt="signup"
            width={420}
            height={1024}
            className=" "
          />
        </div>
      </div>
    </>
  );
};

export default Appointment;
