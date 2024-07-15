import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { OtpFormValues } from "../../types/otpFormValues";
import { OtpSchema } from "@/schemas/otpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "../ui/use-toast";
import axios from "axios";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

const OtpForm = ({
  isDialogOpen,
  setIsDialogOpen,
}: {
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const route = useRouter();

  const form = useForm<OtpFormValues>({
    defaultValues: {
      otp: "",
    },
    mode: "onChange",
    resolver: zodResolver(OtpSchema),
  });

  const { register, handleSubmit, formState } = form;

  const {
    errors: errorsOTP,
    isDirty: isDirtyOTP,
    isValid: isValidOTP,
    isSubmitSuccessful: isSubmitSuccessfulOTP,
  } = formState;

  const onSubmitOTP: SubmitHandler<OtpFormValues> = async (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    try {
      const response = await axios.post<OtpFormValues>(
        // Todo: need to change url
        "https://65784a9df08799dc8044d036.mockapi.io/CRUD",
        data
      );
      toast({
        description: "Verification successful!",
        title: "Success",
        variant: "default",
      });
      route.push("/userDetails");
      setIsDialogOpen(false); 
    } catch (error) {
      console.log("Error Verifying OTP:", error);
      toast({
        title: "Error",
        description: "Error Verifying OTP",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
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
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmitOTP)}
                  className="w-full flex flex-col space-y-6"
                >
                  <FormField
                    control={form.control}
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
                                {...register("otp")}
                              >
                                <InputOTPSlot
                                  {...register("otp")}
                                  index={0}
                                  className="active:border-[#24AE7C] border-2  font-extrabold text-[#24AE7C] border-[#24AE7C] "
                                />
                                <InputOTPSlot
                                  index={1}
                                  {...register("otp")}
                                  className="active:border-[#24AE7C] border-2  font-extrabold text-[#24AE7C] border-[#24AE7C] "
                                />
                                <InputOTPSlot
                                  index={2}
                                  {...register("otp")}
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
                            <FormMessage className="text-center mt-1" />
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
                                Verifying
                              </div>
                            ) : (
                              "Verify"
                            )}
                          </Button>{" "}
                        </FormDescription>
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

export default OtpForm;
