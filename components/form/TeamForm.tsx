// TeamForm.tsx
import React from "react";
import * as Yup from "yup";
import FormikForm from "@/components/FormikForm/FormikForm";
import { Validations } from "@/constants/Validations";

import useTypes from "@/hooks/useTypes";
import { FormValues } from "@/types/global";
import { FormContent } from "./FormHelpers";

export type TeamFormProps = {
  initialValues: FormValues;
  onSubmit: any;
  showSuccessMessage: boolean;
};

const TeamForm: React.FC<TeamFormProps> = ({
  initialValues,
  onSubmit,
  showSuccessMessage,
}) => {
  const validations = Yup.object().shape({
    name: Validations.required.min(3, "Le nom est trop court"),
    surname: Validations.required.min(3, "Le prémom est trop court"),
  });

  const { types, isLoading, error } = useTypes({ url: "teams" });

  const civilities = [
    { value: "M.", label: "Monsieur" },
    { value: "Mme", label: "Madame" },
    { value: "Mlle", label: "Mademoiselle" },
    { value: "Mx", label: "Non binaires" },
    // { value: "", label: "Pas de mention" }, //TODO: Add the option to select none
  ];
  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={onSubmit}
    >
      <FormContent showSuccessMessage={showSuccessMessage} previewType="teams">
        <FormikForm.Select
          disabled={isLoading || error}
          items={types}
          type="select"
          valName="type"
          tx="Form.typeTeams"
          tooltipTx="FormHint.typeTeams"
          required
        />

        <FormikForm.Select
          items={civilities}
          type="select"
          valName="title"
          tx="Form.titleTeams"
          tooltipTx="FormHint.titleTeams"
        />

        <FormikForm.TextInput tx="Form.name" valName="name" required />
        <FormikForm.TextInput tx="Form.surname" valName="surname" required />

        <FormikForm.TextInput tx="Form.email" type="email" valName="mail" />
        <FormikForm.TextInput tx="Form.phone" type="phone" valName="phone" />

        <FormikForm.TextInput tx="Form.dicastere" valName="dicastere" />
        <FormikForm.QuillEditor
          tx="Form.descriptionDicastere"
          valName="descriptionDicastere"
          tooltipTx="FormHint.descriptionDicastere"
        />
        <FormikForm.DropZone
          multiple
          tx="Form.avatar"
          type="image"
          valName="avatar"
        />

        <FormikForm.TextInput
          tx="Form.politicalParty"
          valName="politicalParty"
        />
        <FormikForm.TextInput tx="Form.fonction" valName="fonction" />
        <FormikForm.TextInput tx="Form.suppleant" valName="suppleant" />

        <FormikForm.DateTimePicker
          type="single"
          tx="Form.publishedDate"
          valName="publishedDate"
          tooltipTx="FormHint.publishedDate"
          required
        />

        <FormikForm.DateTimePicker
          type="single"
          tx="Form.unPublishedDate"
          valName="unPublishedDate"
          tooltipTx="FormHint.unPublishedDate"
        />

        <FormikForm.Switch
          tx="Form.notification"
          valName="notification"
          tooltipTx="FormHint.notification"
        />
      </FormContent>
    </FormikForm>
  );
};

export default TeamForm;
