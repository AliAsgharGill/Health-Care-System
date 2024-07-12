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
import { Loader } from "lucide-react";

type SignupFormValues = {
  full_name: string;
  email: string;
  phone_number: string;
};
const SignupForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<SignupFormValues>({
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
    },
    mode: "onChange",
    resolver: zodResolver(SignupSchema),
  });

  const { register, handleSubmit, formState } = form;

  const { errors, isDirty, isValid } = formState;

  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    try {
      const response = await axios.post<SignupFormValues>(
        // Todo: need to change url
        "https://api.shadcn.com/preview-auth/signup",
        data
      );
      toast({
        // description: response.data.message,
        description: "Form submitted successfully!",
        title: "Success",
      });
    } catch (error) {
      console.log("Error Submitting Form:", error);
      toast({
        title: "Error",
        description: "Error Submitting Form",
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
          <div className={`flex flex-col gap-4 `}>
            <div>
              <Label htmlFor="fullName" className="text-[#ABB8C4]">
                Full Name
              </Label>
              <Input
                id="fullName"
                {...register("full_name", { required: true })}
                className="mt-1 border-2 border-transparent focus:border-gradient bg-[#363A3D] text-white"
                type="text"
                placeholder="Ali Asghar"
              />
              <p className=" text-sm text-red-500 my-1">
                {errors.full_name?.message}
              </p>
            </div>
            <div>
              <Label htmlFor="fullName" className="text-[#ABB8C4]  ">
                Email Address
              </Label>
              <Input
                id="fullName"
                {...register("email", { required: true })}
                className="mt-1 border-2 border-transparent focus:border-gradient bg-[#363A3D] text-white"
                type="text"
                placeholder="example@gmail.com"
              />
              <p className=" text-sm text-red-500 my-1">
                {errors.email?.message}
              </p>
            </div>
            <div>
              <Label htmlFor="fullName" className="text-[#ABB8C4]  ">
                Phone number
              </Label>
              <Input
                id="fullName"
                {...register("phone_number", { required: true })}
                className="mt-1 w-full outline-[#0a95ff] border-2 border-transparent focus:border-gradient bg-[#363A3D] text-white"
                type="tel"
                placeholder="+923123456789"
              />
              <p className=" text-sm text-red-500 my-1">
                {errors.phone_number?.message}
              </p>
            </div>
            <div>
              <Button
                type="submit"
                disabled={!isDirty || !isValid}
                className={` ${
                  isValid ? "bg-[#24AE7C] hover:bg-[#24AE7C] " : "bg-gray-300"
                }  w-full mt-4  text-white font-semibold  `}
              >
                {!isValid ? (
                  "Please fill form"
                ) : isSubmitting ? (
                  <div className="flex items-center justify-center font-bold ">
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> Submitting
                  </div>
                ) : (
                  "Get Started"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default SignupForm;
