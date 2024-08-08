import React from "react";
import * as Yup from "yup";
import FormikForm from "@/components/FormikForm/FormikForm";

import useTypes from "@/hooks/useTypes";
import { FormValues } from "@/types/global";

import { FormContent } from "./FormHelpers";

export type LoginFormProps = {
  initialValues: FormValues;
  onSubmit: any;
  showSuccessMessage: boolean;
};

const LoginForm: React.FC<LoginFormProps> = ({
  initialValues,
  onSubmit,
  showSuccessMessage,
}) => {
  const validations = Yup.object().shape({
    // title: Yup.string().required("Le titre est requis"),
    // type: Yup.string().required("Le type est requis"),
    // startDate: Yup.date().required("Une date de début est requise"),
  });

  return (
    <>
      <FormikForm
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={onSubmit}
      >
        <FormContent showSuccessMessage={showSuccessMessage}>
          <FormikForm.TextInput valName="login" tx="Form.login" required />
          <FormikForm.TextInput
            valName="password"
            tx="Form.password"
            required
          />
        </FormContent>
      </FormikForm>
    </>
  );
};

export default LoginForm;
