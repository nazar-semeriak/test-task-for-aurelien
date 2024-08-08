import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../FormikForm.props";

// interface CustomSelectProps extends SelectProps {
interface CustomSelectProps {
  items: any[];
  disabled?: boolean;
}

// export default function TextInput(props: TextInputProps & RnTextInputProps) {
export default function FormSelectInput(
  props: GFieldProps & CustomSelectProps
) {
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
    items,
    ...rest
  } = props;
  const { values, handleChange, setFieldValue, errors, validateField } =
    useGForm();

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
      <Select onValueChange={handleChange(valName)} {...rest}>
        <SelectTrigger>
          <SelectValue placeholder={values[valName]} />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {items &&
              items?.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </BaseField>
  );
}
