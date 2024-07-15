import UserDetailForm from "@/components/userDetailForm/page";
import Image from "next/image";
import React from "react";

const UserDetails = () => {
  return (
    <>
      <div className="flex justify-around  min-h-screen">
        <div className="flex w-1/3 flex-col justify md:m-24 md:ml-10 md:p-16  ">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={200}
            height={200}
          />
          <h1 className="text-3xl text-white mt-10 mb-5 font-bold">
            Welcome 👋
          </h1>
          <p className="text-gray-300 text-lg">
            Let us know more about yourself
          </p>
          {/* User Detail Form*/}
          <UserDetailForm />
        </div>
        <div>
          <Image
            src="/assets/images/detailPageImage.png"
            alt="signup"
            width={390}
            height={1024}
            className=" "
          />
        </div>
      </div>
    </>
  );
};

export default UserDetails;
