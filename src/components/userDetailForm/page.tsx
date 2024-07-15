"use client";
import { UserDetailsTypes } from "@/types/userDetailTypes";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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

const UserDetailsForm = () => {
  const form = useForm<z.infer<typeof UserDetailsSchema>>({
    defaultValues: {
      full_name: "",
      email_address: "",
      phone_number: "",
      date_of_birth: "",
      gender: "male",
      address: "",
      occupation: "",
      emergency_contact_name: "",
      emergency_contact_number: "",

      primary_care_physician: "",
      insurance_provider: "",
      insurance_policy_number: "",
      allergies: "",
      current_medications: "",
      family_medical_history: "",
      past_diagnosis: "",

      identification_type: "",
      identification_number: "",
      scanned_copy_of_identification_document: "",

      receive_treatment: false,
      share_medical_info: false,
      privacy_policy: false,
    },
    mode: "onChange",
    resolver: zodResolver(UserDetailsSchema),
  });

  const { handleSubmit, register, formState, reset } = form;
  const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

  async function onSubmit(data: z.infer<typeof UserDetailsSchema>) {
    console.log("Form Submitted", data);
    try {
      const response = await axios.post<UserDetailsTypes>(
        "https://65784a9df08799dc8044d036.mockapi.io/CRUD",
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
      reset();
    } catch (error) {
      console.log("Getting Error", error);
    }
  }

  const onError = (errors: any) => {
    console.log(errors);
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
          className="space-y-1 text-black bg-gray-400"
        >
          {/* Full Name */}
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Ali Asghar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder="123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">Date of Birth</FormLabel>
                <FormControl>
                  <Input placeholder="YYYY-MM-DD" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">Gender</FormLabel>
                <FormControl>
                  <RadioGroup {...field} className="flex items-center space-x-4">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
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
                  <Input placeholder="Software Engineer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder="John Doe" {...field} />
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
                  <Input placeholder="123-456-7890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Primary Care Physician */}
          <FormField
            control={form.control}
            name="primary_care_physician"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">
                  Primary Care Physician
                </FormLabel>
                <FormControl>
                  <Input placeholder="Dr. Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Allergies */}
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">Allergies</FormLabel>
                <FormControl>
                  <Input placeholder="Peanuts" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder="Diabetes" {...field} />
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
                  <Input placeholder="Aspirin" {...field} />
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
                <FormLabel className="text-[#ABB8C4]">Past Diagnosis</FormLabel>
                <FormControl>
                  <Input placeholder="Hypertension" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Identification Type */}
          <FormField
            control={form.control}
            name="identification_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#ABB8C4]">
                  Identification Type
                </FormLabel>
                <FormControl>
                  <Input placeholder="Driver's License" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  <Input placeholder="D1234567" {...field} />
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
                    placeholder="http://example.com/scan.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                  />
                </FormControl>
                <FormLabel className="text-[#ABB8C4]">
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
                  />
                </FormControl>
                <FormLabel className="text-[#ABB8C4]">
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
                  />
                </FormControl>
                <FormLabel className="text-[#ABB8C4]">
                  I agree to the privacy policy
                </FormLabel>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" disabled={!isDirty || !isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UserDetailsForm;