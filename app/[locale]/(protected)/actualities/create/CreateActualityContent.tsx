"use client";

import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import ActualityForm from "@/components/form/ActualityForm";

const initialValues: any = {
  type: "Actualités",
};

export const CreateActualityContent = () => {
  const { handleSubmit, showSuccessMessage } = useFormSubmit("/actualities");

  return (
    <ActualityForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleSubmit}
    />
  );
};
