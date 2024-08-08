// InfoForm.tsx
import React from "react";
import * as Yup from "yup";
import FormikForm from "@/components/FormikForm/FormikForm";
import { Validations } from "@/constants/Validations";

import useTypes from "@/hooks/useTypes";
import { FormValues } from "@/types/global";
import { FormContent } from "./FormHelpers";

export type InfoFormProps = {
  initialValues: FormValues;
  onSubmit: any;
  showSuccessMessage: boolean;
};

const InfoForm: React.FC<InfoFormProps> = ({
  initialValues,
  onSubmit,
  showSuccessMessage,
}) => {
  const validations = Yup.object().shape({
    title: Validations.required.min(3, "Le titre est trop court"),
  });

  const { types, isLoading, error } = useTypes({ url: "infos" });

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={onSubmit}
    >
      <FormContent showSuccessMessage={showSuccessMessage} previewType="infos">
        {/* <FormikForm.Switch
          tx="Form.infoOffical"
          valName="asService"
          tooltipText={renderText("FormHint.infoOffical")}
        /> */}
        <FormikForm.Select
          disabled={isLoading || error}
          items={types}
          type="select"
          valName="type"
          tx="Form.infoOffical"
          tooltipTx="FormHint.infoOffical"
          required
        />
        <FormikForm.TextInput
          valName="title"
          tx="Form.title"
          tooltipTx="FormHint.title"
          required
        />

        <FormikForm.QuillEditor
          tx="Form.content"
          valName="contentQuill"
          tooltipTx="FormHint.editor"
        />
        <div></div>
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

export default InfoForm;
