import { Switch } from "@/components/ui/switch";

import { BaseField } from "./BaseField";
import { useGForm } from "../FormikForm.props";

export default function FormTextInput(props: any) {
  const {
    containerStyle,
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
  const { values, setFieldValue } = useGForm();

  const onChange = (value: boolean) => {
    setFieldValue(valName, value);
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
      <Switch
        onCheckedChange={onChange}
        checked={values[valName]}
        placeholder={placeholder}
        {...rest}
      />
      <BaseField.ErrorLabel valName={valName} />
    </BaseField>
  );
}
