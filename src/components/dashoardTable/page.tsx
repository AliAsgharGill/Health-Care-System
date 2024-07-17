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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { appointments } from "../../../public/assets/data/appointments";
import ScheduleForm from "../scheduleForm/page";
import CancelationForm from "../cancalationForm/page";

const rowsPerPage = 4;

export function DashboardTable() {
  const [currentScheduleId, setCurrentScheduleId] = useState<number | null>(
    null
  );
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

  const handleSchedule = (id: number) => {
    setCurrentScheduleId(id);
  };

  const closeDialog = () => {
    setCurrentScheduleId(null);
  };

  return (
    <>
      <Table className="text-white w-full">
        <TableCaption className="w-full">
          <Pagination>
            <PaginationContent className="w-full flex justify-between items-center">
              <PaginationItem>
                <PaginationPrevious
                  className="text-[#24AE7C]"
                  onClick={handlePreviousPage}
                  href="#"
                  disabled={currentPage === 1}
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  className="text-[#24AE7C]"
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
          {currentData.map((appointment) => (
            <TableRow
              key={appointment.id}
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="font-semibold mr-2 text-[#24AE7C]"
                      onClick={() => handleSchedule(appointment.id)}
                    >
                      {appointment.actions.schedule}
                    </Button>
                  </DialogTrigger>
                  {currentScheduleId === appointment.id && (
                    <DialogContent
                      onClose={closeDialog}
                      className="bg-[#1A1D21]"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-white">
                          Schedule Appointment
                        </DialogTitle>
                        <DialogDescription>
                          Schedule appointment for{" "}
                          <span className="text-[#24AE7C] font-semibold">
                            {appointment.date}
                          </span>{" "}
                          with{" "}
                          <span className="text-[#24AE7C] font-semibold">
                            {appointment.doctor.name}.
                          </span>
                          {/* Schedule Form */}
                          <ScheduleForm />
                        </DialogDescription>
                        <DialogDescription>
                          Please fill the details to schedule
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  )}
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="font-semibold"
                      onClick={() => handleSchedule(appointment.id)}
                    >
                      {appointment.actions.cancel}
                    </Button>
                  </DialogTrigger>
                  {currentScheduleId === appointment.id && (
                    <DialogContent
                      onClose={closeDialog}
                      className="bg-[#1A1D21]"
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl text-white">
                          Cancel Appointment{" "}
                        </DialogTitle>
                        <DialogDescription className="text-[#ABB8C4]">
                          Are you sure you want to cancel your appointment
                          {/* Cancel Form */}
                          <CancelationForm />
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  )}
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
