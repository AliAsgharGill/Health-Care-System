import { UserDetailsSchema } from "@/schemas/userDetailsSchema";
import { UserDetailsTypes } from "@/types/userDetailTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Form } from "../ui/form";
import { SubmitHandler, useForm } from "react-hook-form";

const UserDetailsForm = () => {
  const form = useForm<UserDetailsTypes>({
    defaultValues: {
      personal_info: {
        full_name: "",
        email_address: "",
        phone_number: "",
        date_of_birth: new Date(),
        gender: "",
        address: "",
        occupation: "",
        emergency_contact_name: "",
        guardian_number: "",
      },
      medical_info: {
        primary_care_physician: "",
        insurance_provider: "",
        insurance_policy_number: "",
        allergies: "",
        current_medications: "",
        family_medical_history: "",
        past_diagnosis: "",
      },
      identification_info: {
        identification_type: "",
        identification_number: "",
        scanned_copy_of_identification_document: "",
      },
      constant_info: {
        receive_treatment: false,
        share_medical_info: false,
        privacy_policy: false,
      },
    },
    mode: "onChange",
    resolver: zodResolver(UserDetailsSchema),
  });
  const { handleSubmit, register, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitSuccessful } = formState;


  const onSubmit: SubmitHandler<UserDetailsTypes> = (data) => {
    console.log(data);
    reset();
  };
  const onError = (errors: any) => {
    console.log(errors);
  };


  return (
    <>
      <h1 className="text-3xl text-white mt-10 mb-5 font-bold">
        Personal Information
      </h1>
      <Form {...form}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="full_name"
                className="text-sm font-medium leading-6 text-white"
              >
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                {...register("personal_info.full_name")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="email_address"
                className="text-sm font-medium leading-6 text-white"
              >
                Email Address
              </label>
              <input
                type="text"
                id="email_address"
                {...register("personal_info.email_address")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="phone_number"
                className="text-sm font-medium leading-6 text-white"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone_number"
                {...register("personal_info.phone_number")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="date_of_birth"
                className="text-sm font-medium leading-6 text-white"
              >
                Date of Birth
              </label>
              <input
                type="text"
                id="date_of_birth"
                {...register("personal_info.date_of_birth")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="gender"
                className="text-sm font-medium leading-6 text-white"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                {...register("personal_info.gender")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="address"
                className="text-sm font-medium leading-6 text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                {...register("personal_info.address")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="occupation"
                className="text-sm font-medium leading-6 text-white"
              >
                Occupation
              </label>
              <input
                type="text"
                id="occupation"
                {...register("personal_info.occupation")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="emergency_contact_name"
                className="text-sm font-medium leading-6 text-white"
              >
                Emergency Contact Name
              </label>
              <input
                type="text"
                id="emergency_contact_name"
                {...register("personal_info.emergency_contact_name")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-1">
              <label
                htmlFor="emergency_contact_number"
                className="text-sm font-medium leading-6 text-white"
              >
                Primary Care Physician
              </label>
              <input
                type="text"
                id="emergency_contact_number"
                {...register("medical_info.primary_care_physician")}
              />
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default UserDetailsForm;
