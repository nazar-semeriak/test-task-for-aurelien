// ActualityForm.tsx
import React from "react";
import * as Yup from "yup";
import FormikForm from "@/components/FormikForm/FormikForm";

import useTypes from "@/hooks/useTypes";
import { FormValues } from "@/types/global";
import { FormContent } from "./FormHelpers";

export type ActualityFormProps = {
  initialValues: FormValues;
  onSubmit: any;
  showSuccessMessage: boolean;
};

const ActualityForm: React.FC<ActualityFormProps> = ({
  initialValues,
  onSubmit,
  showSuccessMessage,
}) => {
  const validations = Yup.object().shape({
    title: Yup.string().required("Le titre est requis"),
    type: Yup.string().required("Le type est requis"),
    // publishedDateRange: Yup.object().required("Une date de début est requise"),
  });

  const { types, isLoading, error } = useTypes({ url: "actualities" });

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={onSubmit}
    >
      <FormContent
        showSuccessMessage={showSuccessMessage}
        previewType="actualities"
      >
        <FormikForm.Select
          disabled={isLoading || error}
          items={types}
          type="select"
          tx="Form.typeNews"
          valName="type"
          required
          tooltipTx="FormHint.typeNews"
        />
        <FormikForm.TextInput
          tx="Form.title"
          valName="title"
          required
          tooltipTx="FormHint.title"
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

        <FormikForm.DateTimePicker
          tx="Form.startDate"
          valName="startDate"
          tooltipTx="FormHint.startDate"
        />
        <FormikForm.DateTimePicker
          tx="Form.endDate"
          valName="endDate"
          tooltipTx="FormHint.endDate"
        />

        <FormikForm.DropZone
          tx="Form.cover"
          type="image"
          valName="cover"
          tooltipTx="FormHint.cover"
        />
        <FormikForm.Switch
          valName="isFeatured"
          tx="Form.isFeatured"
          tooltipTx="FormHint.isFeatured"
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

export default ActualityForm;
