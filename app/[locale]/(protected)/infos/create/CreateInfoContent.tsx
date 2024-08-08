"use client";

import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import InfoForm from "@/components/form/InfoForm";

const initialValues: any = {
  type: "Info",
};

export const CreateInfoContent = () => {
  const { handleSubmit, showSuccessMessage } = useFormSubmit("/infos");

  return (
    <InfoForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleSubmit}
    />
  );
};
