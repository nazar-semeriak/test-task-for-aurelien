import React from "react";
import * as Yup from "yup";
import FormikForm from "@/components/FormikForm/FormikForm";

import useTypes from "@/hooks/useTypes";
import { FormValues } from "@/types/global";

import { FormContent } from "./FormHelpers";

export type ActivityFormProps = {
  initialValues: FormValues;
  onSubmit: any;
  showSuccessMessage: boolean;
};

const ActivityForm: React.FC<ActivityFormProps> = ({
  initialValues,
  onSubmit,
  showSuccessMessage,
}) => {
  const validations = Yup.object().shape({
    title: Yup.string().required("Le titre est requis"),
    type: Yup.string().required("Le type est requis"),
    startDate: Yup.date().required("Une date de début est requise"),
  });

  const { types, isLoading, error } = useTypes({ url: "activities" });

  return (
    <>
      <FormikForm
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        <FormContent
          showSuccessMessage={showSuccessMessage}
          previewType="activities"
        >
          <FormikForm.Select
            disabled={isLoading || error}
            items={types}
            type="select"
            valName="type"
            tx="Form.typeEvents"
            tooltipTx="FormHint.typeEvents"
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
          <FormikForm.DropZone
            tx="Form.cover"
            type="image"
            valName="cover"
            tooltipTx="FormHint.cover"
          />

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
            required
          />
          <FormikForm.DateTimePicker
            tx="Form.endDate"
            valName="endDate"
            tooltipTx="FormHint.endDate"
          />

          <FormikForm.Switch
            tx="Form.notification"
            valName="notification"
            tooltipTx="FormHint.notification"
          />
        </FormContent>
      </FormikForm>
    </>
  );
};

export default ActivityForm;
