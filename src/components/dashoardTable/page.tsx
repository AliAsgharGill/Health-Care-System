"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "../ui/button";

const appointments = [
  {
    name: "Phoenix Baker",
    date: "Jan 4, 2022",
    status: "Scheduled",
    doctor: {
      name: "Dr. John Doe",
      image: "/assets/images/drAlex.png",
    },
    actions: {
      schedule: "Schedule",
      cancel: "Cancel",
    },
  },
  {
    name: "Candice Wu",
    date: "Jan 2, 2022",
    status: "Pending",
    doctor: {
      name: "Dr. Michael May",
      image: "/assets/images/drMichael.png",
    },
    actions: {
      schedule: "Schedule",
      cancel: "Cancel",
    },
  },
  {
    name: "Lana Steiner",
    date: "Jan 4, 2022",
    status: "Cancelled",
    doctor: {
      name: "Dr. Jasmine Lee",
      image: "/assets/images/drJasmine.png", // Corrected path
    },
    actions: {
      schedule: "Schedule",
      cancel: "Cancel",
    },
  },
  {
    name: "Drew Cano",
    date: "Jan 8, 2022",
    status: "Scheduled",
    doctor: {
      name: "Dr. Hardik Sharma",
      image: "/assets/images/drHardik.png",
    },
    actions: {
      schedule: "Schedule",
      cancel: "Cancel",
    },
  },
  {
    name: "Natali Craig",
    date: "Jan 6, 2022",
    status: "Pending",
    doctor: {
      name: "Dr. Alyana Cruz",
      image: "/assets/images/drAlyana.png",
    },
    actions: {
      schedule: "Schedule",
      cancel: "Cancel",
    },
  },
];

export function DashboardTable() {
  return (
    <Table className=" text-white w-full">
      <TableCaption>A list of your recent appointments.</TableCaption>
      <TableHeader>
        <TableRow className="flex items-center justify-between pt-4 w-full bg-[#1A1D21] text-[#CDCECF] hover:bg-black">
          <TableHead className="flex-1" >Patient</TableHead>
          <TableHead className="flex-1">Date</TableHead>
          <TableHead className="flex-1">Status</TableHead>
          <TableHead className="flex-1">Doctor</TableHead>
          <TableHead className="flex-1">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment, index) => (
          <TableRow
            key={index}
            className="even:bg-[#1C2023] flex items-center justify-between w-full"
          >
            <TableCell className="font-medium flex-1">
              {appointment.name}
            </TableCell>
            <TableCell className="flex-1">{appointment.date}</TableCell>
            <TableCell className="flex-1">{appointment.status}</TableCell>
            <TableCell className="flex items-center flex-1">
              <Image
                src={appointment.doctor.image}
                alt="doctor"
                width={50}
                height={50}
              />
              <span className="ml-2">{appointment.doctor.name}</span>
            </TableCell>
            <TableCell className="flex-1">
              <Button className="mr-2">{appointment.actions.schedule}</Button>
              <Button>{appointment.actions.cancel}</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
