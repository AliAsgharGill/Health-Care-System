export type AppointmentFormValues = {
    drName: { value: string; label: string; image: string } | null;
    reason: string;
    additionalComments: string;
    expectedDate: string;
  };

export  type PhysicianOption = {
    value: string;
    label: string;
    image: string;
  };
  