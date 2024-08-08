"use client";
import React, { useEffect, useRef } from "react";

import EditorJS from "@editorjs/editorjs";
// Make sure you have this file with the necessary tools configuration
import { BaseField } from "../BaseField";
import { useGForm } from "../../FormikForm.props";
import { EDITOR_TOOLS } from "./EditorTools";

export default function FormEditorJS(props: any) {
  const {
    valName,
    text,
    tx,
    placeholder,
    placeholderTx,
    hintText,
    tooltipText,
    required,
    ...rest
  } = props;
  const { setFieldValue, values } = useGForm();
  const editorInstance = useRef(rest.ref);

  useEffect(() => {
    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: valName, // You might want to ensure this is a unique id for each instance
        tools: EDITOR_TOOLS,
        data: values[valName],
        async onChange() {
          const savedData = await editor.save();
          setFieldValue(valName, savedData);
          // handleChange(valName)(savedData); // Update your form state with the new editor content
        },
        ...rest,
      });
      // @ts-ignore
      editorInstance.current = editor;
    }

    return () => {
      if (
        editorInstance.current &&
        (editorInstance.current as EditorJS).destroy
      ) {
        (editorInstance.current as EditorJS).destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return (
    <BaseField
      text={text}
      tx={tx}
      hintText={hintText}
      tooltipText={tooltipText}
      valName={valName}
      required={required}
    >
      <div
        id={valName}
        // className="editor-js-container"
        className="editor-js-container text-justify w-full rounded-md border border-input bg-background px-3 py-2 max-w-[65ch]"
      />
      <BaseField.ErrorLabel valName={valName} />
    </BaseField>
  );
}
