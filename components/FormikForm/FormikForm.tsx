"use client";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import { PropsWithChildren } from "react";

import { GFormContext, GFormProps } from "./FormikForm.props";
// import AddressPicker from "./components/AddressPicker";
// import DropPicker from "./components/DropPicker";
// import NumberPicker from "./components/NumberPicker";
// import Radio from "./components/Radio";
import SubmitButton from "./components/SubmitButton";
import Switch from "./components/Switch";
import Select from "./components/Select";
import TextInput from "./components/TextInput";
import DatePicker from "./components/DatePicker";
import DateTimePicker from "./components/DateTimePicker";
import QuillEditor from "./components/QuillEditor";
import EditorJS from "./components/editorJS/EditorJS";

import dynamic from "next/dynamic";
import DropZone from "./components/DropZone";
import AddressPicker from "./components/AddressPicker";

const CustomEditorJS = dynamic(() => import("./components/editorJS/EditorJS"), {
  ssr: false,
  // loading: () => <p>Loading ...</p>,
});

FormikForm.SubmitButton = SubmitButton;
FormikForm.TextInput = TextInput;
FormikForm.Switch = Switch;
FormikForm.Select = Select;
FormikForm.DatePicker = DatePicker;
FormikForm.DateTimePicker = DateTimePicker;
FormikForm.DropZone = DropZone;
FormikForm.QuillEditor = QuillEditor;
FormikForm.EditorJS = CustomEditorJS;
FormikForm.AdressPicker = AddressPicker;

export default function FormikForm<Values extends FormikValues = FormikValues>({
  containerStyle,
  children,
  ...props
}: PropsWithChildren<FormikConfig<Values> & GFormProps>) {
  return (
    <Formik validateOnChange={false} {...props}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        values,
        errors,
        validateField,
        setFieldError,
        isSubmitting,
      }) => {
        return (
          <GFormContext.Provider
            value={{
              handleChange,
              handleSubmit,
              handleBlur,
              setFieldValue,
              values,
              errors,
              validateField,
              setFieldError,
              isSubmitting,
            }}
          >
            <Form className="w-full">{children}</Form>
          </GFormContext.Provider>
        );
      }}
    </Formik>
  );
}
