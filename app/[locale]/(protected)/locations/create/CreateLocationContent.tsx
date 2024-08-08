"use client";

import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import LocationForm from "@/components/form/LocationForm";

const initialValues: any = {
  title: "",
};

export const CreateLocationContent = () => {
  const { handleSubmit, showSuccessMessage } = useFormSubmit("/locations");

  return (
    <LocationForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleSubmit}
    />
  );
};
