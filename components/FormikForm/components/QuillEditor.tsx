"use client";

import { BaseField } from "./BaseField";
import { useGForm } from "../FormikForm.props";

import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function QuillEditor(props: any) {
  const {
    valName,
    text,
    placeholder,
    inputStyle = {},
    preset = "default",
    tx,
    placeholderTx,
    hintText,
    tooltipText,
    tooltipTx,
    required,
    ...rest
  } = props;
  const { handleChange, values } = useGForm();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }],

      ["link", "image"],
    ],
  };

  return (
    <BaseField
      text={text}
      tx={tx}
      hintText={hintText}
      tooltipText={tooltipText}
      tooltipTx={tooltipTx}
      valName={valName}
      required={required}
    >
      <ReactQuill
        onChange={handleChange(valName)}
        value={values[valName]}
        modules={modules}
        {...rest}
      />

      {/* <div
        className="quill"
        dangerouslySetInnerHTML={{
          __html: values[valName],
        }}
      /> */}
      <BaseField.ErrorLabel valName={valName} />
    </BaseField>
  );
}

// const inputError = {
//   borderWidth: 2,
//   borderColor: color.primary,
// } as ViewStyle;
