"use client";

import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import ActivityForm from "@/components/form/ActivityForm";

const initialValues: any = {
  title: "",
};

export const CreateActivityContent = () => {
  const { handleSubmit, showSuccessMessage } = useFormSubmit("/activities");

  return (
    <ActivityForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleSubmit}
    />
  );
};
