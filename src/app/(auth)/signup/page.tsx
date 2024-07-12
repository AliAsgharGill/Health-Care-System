import SignupForm from "@/components/signupForm/page";
import Image from "next/image";
import React from "react";

const Signup = () => {
  return (
    <>
      <div className="flex  justify-evenly m-5  ">
        <div className="flex w-1/3 flex-col justify md:ml-10 md:p-16  ">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={200}
            height={200}
          />
          <div>
            <h1 className="text-4xl text-white font-bold mt-20 ">
              Hi there, ....
            </h1>
            <p className="text-gray-50  w-full text-lg mt-8 ">
              Get Started with Appointments.
            </p>
          </div>
          <SignupForm props="my-10" />
          <div>
            <p className="text-[#76828D] mt-20 " >@carepulse copyright</p>
          </div>
        </div>
        <div>
          <Image
            src="/assets/images/signupPageImage.png"
            alt="signup"
            width={600}
            height={1024}
            className="md:m-4 md:ml-10 md:p-16 "
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
