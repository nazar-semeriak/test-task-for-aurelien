"use client";

import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import TeamForm from "@/components/form/TeamForm";

const initialValues: any = {
  title: "",
};

export const CreateTeamContent = () => {
  const { handleSubmit, showSuccessMessage } = useFormSubmit("/teams");

  return (
    <TeamForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleSubmit}
    />
  );
};
