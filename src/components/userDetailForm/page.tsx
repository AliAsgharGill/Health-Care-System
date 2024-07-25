"use client";
import { UserDetailsTypes } from "@/types/userDetailTypes";
import React, { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { UserDetailsSchema } from "@/schemas/userDetailsSchema";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { Loader } from "lucide-react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  IdentificationType,
  physicianOptions,
} from "../../../public/assets/data/userFormData";
import { defaultValues } from "./defaultValues";

const UserDetailsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const route = useRouter();
  const form = useForm<z.infer<typeof UserDetailsSchema>>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(UserDetailsSchema),
  });

  const { handleSubmit, register, formState, reset, setValue } = form;
  const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

  async function onSubmit(data: z.infer<typeof UserDetailsSchema>) {
    setIsSubmitting(true);
    console.log("Form Submitted", data);
    try {
      const response = await axios.post<UserDetailsTypes>(
        "http://127.0.0.1:8000/register/details",
        data
      );
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      route.push("/appointment");
      reset();
    } catch (error) {
      console.log("Getting Error", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const onError = (errors: any) => {
    console.log(errors);
  };

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    setValue("date_of_birth", format(selectedDate, "yyyy-MM-dd"));
  };

  return (
    <>
      <h1 className="text-3xl text-white mt-10 mb-5 font-bold">
        Personal Information
      </h1>
      <Form {...form}>
        <form
          noValidate
          onSubmit={handleSubmit(onSubmit, onError)}
          className="space-y-1 w-[100%] text-black"
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ali Asghar"
                    {...field}
                    className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4 mt-3 ">
            {/* Email Address */}
            <FormField
              control={form.control}
              name="email_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123-456-7890"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3 ">
            {/* Date of Birth */}
            <FormField
              control={form.control}
              name="date_of_birth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Date of Birth
                  </FormLabel>
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
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex w-auto flex-col bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] rounded-lg text-white space-y-2 p-2">
                        <Select
                          onValueChange={(value) =>
                            handleDateChange(
                              addDays(new Date(), parseInt(value))
                            )
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
                        </Select>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3 ">
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123 Main St"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Occupation */}
            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">Occupation</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Software Engineer"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3 ">
            {/* Emergency Contact Name */}
            <FormField
              control={form.control}
              name="emergency_contact_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Emergency Contact Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Emergency Contact Number */}
            <FormField
              control={form.control}
              name="emergency_contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Emergency Contact Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="123-456-7890"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3 ">
            <h1 className="text-3xl text-white mt-20 mb-5 font-bold">
              Medical Information{" "}
            </h1>
          </div>
          {/* Primary Care Physician */}
          <div className="form-field">
            <label className="text-[#ABB8C4]">Primary Care Physician</label>
            <Controller
              name="primary_care_physician"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                >
                  <SelectTrigger>
                    <SelectValue>
                      {physicianOptions.find(
                        (option) => option.value === field.value
                      )?.label || "Select a physician"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {physicianOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <Image
                          src={option.image}
                          alt={option.label}
                          height={24}
                          width={24}
                          className="inline-block mr-2"
                        />
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3 ">
            {/* Insurance Provider */}
            <FormField
              control={form.control}
              name="insurance_provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Insurance Provider
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Blue Cross Blue Shield"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Insurance Policy Number */}
            <FormField
              control={form.control}
              name="insurance_policy_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Insurance Policy Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="1234567890"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3 ">
            {/* Allergies */}
            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">Allergies</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Peanuts"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Current Medications */}
            <FormField
              control={form.control}
              name="current_medications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Current Medications
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Aspirin"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-3 ">
            {/* Family Medical History */}
            <FormField
              control={form.control}
              name="family_medical_history"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Family Medical History
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Diabetes"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Past Diagnosis */}
            <FormField
              control={form.control}
              name="past_diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#ABB8C4]">
                    Past Diagnosis
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Hypertension"
                      {...field}
                      className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 mt-3 ">
            <h1 className="text-3xl  text-white mt-20 mb-5 font-bold">
              Identification and Verification{" "}
            </h1>
          </div>

          {/* Identification Type */}
          <div className="form-field">
            <label className="text-[#ABB8C4]">Identification Type</label>
            <Controller
              name="identification_type"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                >
                  <SelectTrigger>
                    <SelectValue>
                      {IdentificationType.find(
                        (option) => option.value === field.value
                      )?.label || "Select an identification type"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {IdentificationType.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Identification Number */}
          <FormField
            control={form.control}
            name="identification_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">
                  Identification Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="D1234567"
                    {...field}
                    className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Scanned Copy of Identification Document */}
          <FormField
            control={form.control}
            name="scanned_copy_of_identification_document"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">
                  Scanned Copy of Identification Document
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="http://example.com/scan.jpg"
                    {...field}
                    className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-4 mt-3 ">
            <h1 className="text-3xl  text-white mt-20 mb-5 font-bold">
              Consent and Privacy{" "}
            </h1>
          </div>

          {/* Consent to Receive Treatment */}
          <FormField
            control={form.control}
            name="receive_treatment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                  />
                </FormControl>
                <FormLabel className="text-[#ABB8C4] pl-2 ">
                  I consent to receive treatment
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Consent to Share Medical Information */}
          <FormField
            control={form.control}
            name="share_medical_info"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                  />
                </FormControl>
                <FormLabel className="text-[#ABB8C4] pl-2 ">
                  I consent to share my medical information with relevant
                  parties
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Consent to Privacy Policy */}
          <FormField
            control={form.control}
            name="privacy_policy"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="bg-[#1A1D21] border-[#363A3D] placeholder:text-[#76828D] text-white"
                  />
                </FormControl>
                <FormLabel className="text-[#ABB8C4] pl-2 ">
                  I agree to the privacy policy
                </FormLabel>
              </FormItem>
            )}
          />

          <div>
            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isDirty || !isValid}
              className={`${
                isValid ? "bg-[#24AE7C]" : "bg-gray-300"
              } w-full mt-4 text-white font-semibold hover:bg-[#24AE7C] my-10 `}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center font-bold">
                  <Loader className="mr-2 h-4 w-4 animate-spin" /> Registering
                </div>
              ) : (
                "Submit and continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UserDetailsForm;
