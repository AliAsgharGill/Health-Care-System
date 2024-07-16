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
import {
  Select as UISelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

type PhysicianOption = {
  value: string;
  label: string;
  image: string;
};

export const physicianOptions: PhysicianOption[] = [
  {
    value: "dr_ali",
    label: "Dr. Ali",
    image: "/assets/images/drAdam.png",
  },
  {
    value: "dr_ava",
    label: "Dr. Ava",
    image: "/assets/images/drAva.png",
  },
  {
    value: "dr_sarah",
    label: "Dr. Sarah",
    image: "/assets/images/drSarah.png",
  },
];

const AppointmentForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const form = useForm<AppointmentFormValues>({
    defaultValues: {
      drName: null,
      reason: "",
      additionalComments: "",
      expectedDate: "",
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
        description: "Form submitted successfully!",
        title: "Success",
        variant: "default",
      });
      reset();
    } catch (error) {
      console.log("Error Registering User:", error);
      toast({
        title: "Error",
        description: "Error Registering User",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    form.setValue("expectedDate", selectedDate.toISOString());
  };

  return (
    <>
      <Form {...form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <FormField
            control={control}
            name="drName"
            rules={{ required: "Please select a physician" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Physician</FormLabel>
                <FormControl>
                  <Controller
                    control={control}
                    name="drName"
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={physicianOptions}
                        getOptionLabel={(option: PhysicianOption) => (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <Image
                              src={option.image}
                              alt={option.label}
                              height={24}
                              width={24}
                            />
                            {option.label}
                          </div>
                        )}
                        getOptionValue={(option: PhysicianOption) =>
                          option.value
                        }
                      />
                    )}
                  />
                </FormControl>
                <FormMessage>{errors.drName?.message}</FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason</FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 border-2 pl-10 border-transparent active:border-gradient bg-[#363A3D] text-white"
                    type="text"
                    placeholder="Reason for visit"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What is the reason for your visit?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="additionalComments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Comments</FormLabel>
                <FormControl>
                  <Input
                    className="mt-1 border-2 pl-10 border-transparent active:border-gradient bg-[#363A3D] text-white"
                    type="text"
                    placeholder="Additional comments"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Add any additional comments here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="expectedDate"
            rules={{ required: "Please select an expected date" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Expected Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          " bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="flex w-auto flex-col bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] rounded-lg text-white space-y-2 p-2">
                      <UISelect
                        onValueChange={(value) =>
                          handleDateChange(addDays(new Date(), parseInt(value)))
                        }
                      >
                        <SelectTrigger className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white ">
                          <SelectValue
                            placeholder="Select"
                            className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white "
                          />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white "
                        >
                          <SelectItem value="0">Today</SelectItem>
                          <SelectItem value="1">Tomorrow</SelectItem>
                          <SelectItem value="3">In 3 days</SelectItem>
                          <SelectItem value="7">In a week</SelectItem>
                        </SelectContent>
                      </UISelect>
                      <div className="rounded-md border bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white ">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateChange}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage>{errors.expectedDate?.message}</FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={
              !isDirty || !isValid || isSubmitSuccessful || isSubmitting
            }
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AppointmentForm;
