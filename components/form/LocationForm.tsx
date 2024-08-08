// LocationForm.tsx
import React from "react";
import * as Yup from "yup";
import FormikForm from "@/components/FormikForm/FormikForm";
import { Validations } from "@/constants/Validations";

import useTypes from "@/hooks/useTypes";
import { FormValues } from "@/types/global";
import { FormContent } from "./FormHelpers";

export type LocationFormProps = {
  initialValues: FormValues;
  onSubmit: any;
  showSuccessMessage: boolean;
};

const LocationForm: React.FC<LocationFormProps> = ({
  initialValues,
  onSubmit,
  showSuccessMessage,
}) => {
  const validations = Yup.object().shape({
    title: Validations.required.min(3, "Le titre est trop court"),
    type: Yup.string().required("Le type est requis"),
    location: Yup.object().required("La localisation est requise"),
    // location: Yup.object()
    //   .shape({
    //     latitude: Yup.string().required("La latitude est requise"),
    //     longitude: Yup.string().required("La longitude est requise"),
    //   })
    //   .required("La localisation est requise"),
  });

  const { types, isLoading, error } = useTypes({ url: "locations" });

  return (
    <FormikForm
      initialValues={initialValues}
      validationSchema={validations}
      onSubmit={onSubmit}
    >
      <FormContent
        showSuccessMessage={showSuccessMessage}
        previewType="locations"
      >
        <FormikForm.Select
          disabled={isLoading || error}
          items={types}
          type="select"
          valName="type"
          tx="Form.typeLocations"
          tooltipTx="FormHint.typeLocations"
          required
        />
        <FormikForm.AdressPicker
          tx="Form.address"
          type="location"
          valName="location"
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
          tx="Form.notification"
          valName="notification"
          tooltipTx="FormHint.notification"
        />
      </FormContent>
    </FormikForm>
  );
};

export default LocationForm;
