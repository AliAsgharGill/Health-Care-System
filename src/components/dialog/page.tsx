import React from "react";
import {
  Dialog as ShadCNDialog,
  DialogContent as ShadCNDialogContent,
  DialogDescription as ShadCNDialogDescription,
  DialogHeader as ShadCNDialogHeader,
  DialogTitle as ShadCNDialogTitle,
  DialogTrigger as ShadCNDialogTrigger,
} from "@/components/ui/dialog";
import classNames from "classnames";

export const Dialog: React.FC = () => {
  return (
    <ShadCNDialog>
      <ShadCNDialogTrigger asChild>
        <button className="btn btn-primary">Open Dialog</button>
      </ShadCNDialogTrigger>
      <ShadCNDialogContent
        className={classNames(
          "p-6 bg-white rounded-lg shadow-md",
          "max-w-lg mx-auto my-8"
        )}
      >
        <ShadCNDialogHeader>
          <ShadCNDialogTitle className="text-lg font-semibold">
            Are you absolutely sure?
          </ShadCNDialogTitle>
          <ShadCNDialogDescription className="mt-2 text-sm text-gray-600">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </ShadCNDialogDescription>
        </ShadCNDialogHeader>
      </ShadCNDialogContent>
    </ShadCNDialog>
  );
};

export default Dialog;
