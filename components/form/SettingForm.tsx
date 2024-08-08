// SettingForm.tsx
import React from "react";
import * as Yup from "yup";
import FormikForm from "@/components/FormikForm/FormikForm";
import { Validations } from "@/constants/Validations";

import useTypes from "@/hooks/useTypes";
import { FormValues } from "@/types/global";
import { FormContent } from "./FormHelpers";

export type SettingFormProps = {
  initialValues: FormValues;
  onSubmit: any;
  showSuccessMessage: boolean;
};

const SettingForm: React.FC<SettingFormProps> = ({
  initialValues,
  onSubmit,
  showSuccessMessage,
}) => {
  const validations = Yup.object().shape({
    mail: Validations.email,
    phone: Validations.phone,
    website: Validations.website,
    // title: Validations.required.min(3, "Le titre est trop court"),
  });

  return (
    <>
      <FormikForm
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        <h2 className="text-2xl font-bold  p-4">Contact</h2>
        <FormContent
          showSuccessMessage={showSuccessMessage}
          previewType="settings"
          saveDraft={false}
        >
          <FormikForm.TextInput valName="phone" tx="Form.phone" />
          <FormikForm.TextInput valName="mail" tx="Form.email" />
          <FormikForm.TextInput valName="website" tx="Form.website" />
        </FormContent>
      </FormikForm>
    </>
  );
};

export default SettingForm;
