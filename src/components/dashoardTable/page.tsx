"use client";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
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
      image: "/assets/images/drJasmine.png",
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

const rowsPerPage = 4;

export function DashboardTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(appointments.length / rowsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentData = appointments.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Table className="text-white w-full">
      <TableCaption className="w-full">
        <Pagination>
          <PaginationContent className="w-full flex justify-between items-center">
            <PaginationItem>
              <PaginationPrevious
                onClick={handlePreviousPage}
                href="#"
                disabled={currentPage === 1}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={handleNextPage}
                href="#"
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </TableCaption>
      <TableHeader>
        <TableRow className="flex items-center justify-between pt-4 w-full bg-[#1A1D21] text-[#CDCECF] hover:bg-black">
          <TableHead className="flex-1">Patient</TableHead>
          <TableHead className="flex-1">Date</TableHead>
          <TableHead className="flex-1">Status</TableHead>
          <TableHead className="flex-1">Doctor</TableHead>
          <TableHead className="flex-1">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentData.map((appointment, index) => (
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
              <Button
                variant="ghost"
                className="font-semibold mr-2 text-[#24AE7C]"
              >
                {appointment.actions.schedule}
              </Button>
              <Button variant="ghost">{appointment.actions.cancel}</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
