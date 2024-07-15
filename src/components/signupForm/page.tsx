"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema } from "@/schemas/signupSchema";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { Loader } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { SignupFormValues } from "@/types/singupFormValues";
import { OtpFormValues } from "../../types/otpFormValues";
import { OtpSchema } from "@/schemas/otpSchema";

const SignupForm: React.FC<{ props?: string }> = ({ props }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

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

  const formOTP = useForm<OtpFormValues>({
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
    resolver: zodResolver(OtpSchema),
  });

  const {
    register: registerOTP,
    handleSubmit: handleSubmitOTP,
    formState: formStateOTP,
  } = formOTP;

  const {
    errors: errorsOTP,
    isDirty: isDirtyOTP,
    isValid: isValidOTP,
  } = formStateOTP;

  const onSubmit: SubmitHandler<SignupFormValues> = async (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    try {
      const response = await axios.post<SignupFormValues>(
        // Todo: need to change url
        "https://api.shadcn.com/preview-auth/signup",
        data
      );
      toast({
        description: "Form submitted successfully!",
        title: "Success",
        variant: "default",
      });
      setIsDialogOpen(true); // Open the dialog on successful submission
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

  const onSubmitOTP: SubmitHandler<OtpFormValues> = async (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    try {
      const response = await axios.post<OtpFormValues>(
        // Todo: need to change url
        "https://api.shadcn.com/preview-auth/otp",
        data
      );
      toast({
        description: "Form submitted successfully!",
        title: "Success",
        variant: "default",
      });
      setIsDialogOpen(true); // Open the dialog on successful submission
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
          <div className={`flex flex-col gap-4 ${props}`}>
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
              <Label htmlFor="email" className="text-[#ABB8C4]">
                Email Address
              </Label>
              <Input
                id="email"
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
              <Label htmlFor="phoneNumber" className="text-[#ABB8C4]">
                Phone number
              </Label>
              <Input
                id="phoneNumber"
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
                className={`${
                  isValid ? "bg-[#24AE7C]" : "bg-gray-300"
                } w-full mt-4 text-white font-semibold hover:bg-[#24AE7C]`}
              >
                {!isValid ? (
                  "Please fill form"
                ) : isSubmitting ? (
                  <div className="flex items-center justify-center font-bold">
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black h-[250px] flex flex-col ">
          <DialogHeader>
            <DialogTitle className=" text-white font-bold text-2xl ">
              Verify OTP
            </DialogTitle>
            <DialogDescription className=" text-gray-300 ">
              Please enter the OTP sent to your registered mobile number.
            </DialogDescription>
            <DialogDescription className="flex justify-center ">
              <Form {...formOTP}>
                <form
                  onSubmit={formOTP.handleSubmit(onSubmitOTP)}
                  className="w-full flex flex-col space-y-6"
                >
                  <FormField
                    control={formOTP.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <InputOTP
                              maxLength={6}
                              {...field}
                              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                            >
                              <InputOTPGroup
                                className="w-full flex justify-center items-center "
                                {...registerOTP("otp")}
                              >
                                <InputOTPSlot
                                  {...registerOTP("otp")}
                                  index={0}
                                  className="active:border-[#24AE7C] border-2  font-extrabold text-[#24AE7C] border-[#24AE7C] "
                                />
                                <InputOTPSlot
                                  index={1}
                                  {...registerOTP("otp")}
                                  className="active:border-[#24AE7C] border-2  font-extrabold text-[#24AE7C] border-[#24AE7C] "
                                />
                                <InputOTPSlot
                                  index={2}
                                  {...registerOTP("otp")}
                                  className="active:border-[#24AE7C] border-2  font-extrabold text-[#24AE7C] border-[#24AE7C] "
                                />
                                <InputOTPSlot
                                  index={3}
                                  className="active:border-[#24AE7C] border-2  font-extrabold text-[#24AE7C] border-[#24AE7C] "
                                />
                                <InputOTPSlot
                                  index={4}
                                  className="active:border-[#24AE7C] border-2  font-extrabold text-[#24AE7C] border-[#24AE7C] "
                                />
                                <InputOTPSlot
                                  index={5}
                                  className="active:border-[#24AE7C] border-2  font-extrabold text-[#24AE7C] border-[#24AE7C] "
                                />
                              </InputOTPGroup>
                            </InputOTP>
                            <p className=" text-sm text-red-500 my-1 text-center">
                              {errorsOTP.otp?.message}
                            </p>
                          </div>
                        </FormControl>
                        <FormDescription>
                          <Button
                            type="submit"
                            disabled={!isDirtyOTP || !isValidOTP}
                            className={`${
                              isValidOTP ? "bg-[#24AE7C]" : "bg-gray-300"
                            } w-full mt-4 text-white font-semibold hover:bg-[#24AE7C]  `}
                          >
                            {!isValidOTP ? (
                              "Please enter OTP"
                            ) : isSubmitting ? (
                              <div className="flex items-center justify-center font-bold">
                                <Loader className="mr-2 h-4 w-4 animate-spin" />{" "}
                                Submitting
                              </div>
                            ) : (
                              "Verify"
                            )}
                          </Button>{" "}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignupForm;
