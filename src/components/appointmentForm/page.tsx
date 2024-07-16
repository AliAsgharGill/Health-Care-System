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
                  <Controller
                    control={control}
                    name="expectedDate"
                    render={({ field }) => (
                      <Calendar
                        className="mt-1 border-2 pl-10 border-transparent active:border-gradient bg-[#363A3D] text-white"
                        {...field}
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    )}
                  />
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
