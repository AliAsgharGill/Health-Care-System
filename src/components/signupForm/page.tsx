"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schemas/signupSchema";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { Loader, Mail, Phone, User } from "lucide-react";

import { SignupFormValues } from "@/types/signupFormTypes";
import OtpForm from "../otpForm/page";

const SignupForm: React.FC<{ props?: string }> = ({ props }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<SignupFormValues>({
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
    },
    mode: "onChange",
    resolver: zodResolver(SignupSchema),
  });
  const { register, handleSubmit, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    try {
      const response = await axios.post<SignupFormValues>(
        // Todo: need to change url
        "https://65784a9df08799dc8044d036.mockapi.io/CRUD",
        data
      );
      toast({
        description: "Form submitted successfully!",
        title: "Success",
        variant: "default",
      });
      reset();
      setIsDialogOpen(true);
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
          {/* Full Name */}
          <div className={`flex flex-col gap-4 ${props}`}>
            <div>
              <Label htmlFor="fullName" className="text-[#ABB8C4]">
                Full Name
              </Label>
              <div className="relative flex items-center ">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5mt-1  w-5 text-white" />
                </div>
                <Input
                  id="fullName"
                  {...register("full_name", { required: true })}
                  className="mt-1 border-2 pl-10  active:border-gradient bg-[#363A3D] text-white  focus:border-gradient-to-r from-[#82DBF7] via-[#84DCF5] to-[#B6F09C]   "
                  type="text"
                  placeholder="Ali Asghar"
                />
              </div>
              <p className=" text-sm text-red-500 my-1">
                {errors.full_name?.message}
              </p>
            </div>
            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-[#ABB8C4]">
                Email Address
              </Label>
              <div className="relative flex items-center">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 mt-1  w-5 text-white" />
                </div>
                <Input
                  id="email"
                  {...register("email", { required: true })}
                  className="mt-1 border-2 pl-10 border-transparent focus:border-gradient bg-[#363A3D] text-white"
                  type="text"
                  placeholder="example@gmail.com"
                />
              </div>
              <p className=" text-sm text-red-500 my-1">
                {errors.email?.message}
              </p>
            </div>
            {/* Phone Number */}
            <div>
              <Label htmlFor="phoneNumber" className="text-[#ABB8C4]">
                Phone number
              </Label>
              <div className="relative flex items-center ">
                <div className="absolute left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 mt-1 w-5 text-white" />
                </div>
                <Input
                  id="phoneNumber"
                  {...register("phone_number", { required: true })}
                  className="mt-1 w-full pl-10 outline-[#0a95ff] border-2 border-transparent focus:border-gradient bg-[#363A3D] text-white"
                  type="tel"
                  placeholder="+923123456789"
                />
              </div>
              <p className=" text-sm text-red-500 my-1">
                {errors.phone_number?.message}
              </p>
            </div>
            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                disabled={!isDirty || !isValid}
                className={`${
                  isValid ? "bg-[#24AE7C]" : "bg-gray-300"
                } w-full mt-4 text-white font-semibold hover:bg-[#24AE7C]`}
              >
                {!isValid ? (
                  "Please fill form"
                ) : isSubmitting ? (
                  <div className="flex items-center justify-center font-bold">
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Registering...
                  </div>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {isSubmitSuccessful && (
        <OtpForm
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          nextRoute="/userDetails"
        />
      )}
    </>
  );
};

export default SignupForm;
