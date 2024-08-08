import { RiCheckboxCircleLine } from "@remixicon/react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  title?: string;
  description?: string;
  variant?:
    | "success"
    | "error"
    | "warning"
    | "primary"
    | "destructive"
    | "emerald"
    | "gray"
    | "default";
};

export function EventDatePickerHelper({}: Props) {
  return (
    <p className="text-gray-500 pt-1">
      Choisissez la date de début et si besoin de fin de votre événement
    </p>
  );
}

export function DatePickerHelper({}: Props) {
  return (
    <p className="text-gray-500 pt-1">
      Vous pouvez optionnellement choisir une date de fin pour automatiquement
      supprimer la publication et ainsi économiser des ressources
    </p>
  );
}
export function TextSuccessMessage({
  title = "Publication réussie",
  description = "Vous serez redirigé(e) dans quelques secondes.",
}: Props) {
  return (
    <Alert className="my-2" variant="success">
      <RiCheckboxCircleLine className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      {/* <AlertDescription>{description}</AlertDescription> */}
    </Alert>
  );
}
