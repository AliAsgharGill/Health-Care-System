"use client";
import React, { useState } from "react";
import Select from "react-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { AppointmentFormValues } from "@/types/appointmentTypes";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Input } from "../ui/input";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Textarea } from "@/components/ui/textarea";

import {
  Select as UISelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon, Loader } from "lucide-react";
import { physicianOptions } from "../../../public/assets/data/userFormData";

const CancellationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      reason: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid, isSubmitSuccessful },
    control,
  } = form;

  const onSubmit: SubmitHandler<AppointmentFormValues> = async (data) => {
    console.log(data);

    setIsSubmitting(true);

    try {
      await axios.post<AppointmentFormValues>(
        "https://65784a9df08799dc8044d036.mockapi.io/CRUD",
        data
      );
      toast({
        description: "Successfully canceled appointment!",
        title: "Success",
        variant: "default",
      });
      reset();
    } catch (error) {
      console.log("Error canceling appointment:", error);
      toast({
        title: "Error",
        description: "Error canceling appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (selectedDate: Date) => {
    form.setValue("expectedDate", selectedDate.toISOString());
  };

  return (
    <>
      <Form {...form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-4 mt-3 ">
            <FormField
              control={control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Reason for cancellation
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="mt-1 border-2 border-transparent active:border-gradient bg-[#363A3D] text-white placeholder:text-[#76828D]"
                      type="text"
                      placeholder="ex: Urgent meeting came up"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={!isDirty}
            className={`${
              isValid ? "bg-[#F24E43]" : "bg-gray-300"
            } w-full mt-4 text-white font-semibold hover:bg-[#F24E43] my-10 `}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center font-bold">
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Canceling...
              </div>
            ) : (
              "Cancel Appointment"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CancellationForm;
