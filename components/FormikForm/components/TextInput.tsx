import { Input } from "@/components/ui/input";

import { BaseField } from "./BaseField";
import { GFieldProps, GFormProps, useGForm } from "../FormikForm.props";

export default function FormTextInput(props: GFieldProps) {
  const {
    valName,
    text,
    placeholder,
    tx,
    placeholderTx,
    hintText,
    tooltipText,
    tooltipTx,
    required,
    ...rest
  } = props;
  const { handleChange, values } = useGForm();

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
      <Input
        onChange={handleChange(valName)}
        value={values[valName]}
        placeholder={placeholder}
        {...rest}
      />
    </BaseField>
  );
}
