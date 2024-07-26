export type AppointmentFormValues = {
    dr_name: string;
    reason: string;
    additionalComments: string;
    expectedDate: string;
    status: string;
    patient_name:string
  };

export  type PhysicianOption = {
    value: string;
    label: string;
    image: string;
  };
  