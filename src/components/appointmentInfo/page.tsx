import { Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";

const data = [
  {
    image: "/assets/images/calendar.png",
    title: "94",
    description: "Total number of scheduled appointments",
  },
  {
    image: "/assets/images/hourGlass.png",
    title: "32",
    description: "TTotal number of pending appointments",
  },
  {
    image: "/assets/images/redAlert.png",
    title: "56",
    description: "Total number of cancelled  appointments",
  },
];
const AppointmentInfo = () => {
  return (
    <div className="flex justify-around items-center">
      {data.map((item) => (
        <div
          className="flex flex-col justify-evenly h-40  space-x-5 rounded-lg w-1/4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900"
          key={item.title}
        >
          <div className="flex items-center">
            <Image
              className="mt-5 ml-2"
              src={item.image}
              alt="calendar"
              width={50}
              height={40}
            />
            <h1 className="text-4xl  text-white font-bold">{item.title}</h1>
          </div>
          <div>
            <p className="text-xl text-white">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentInfo;
