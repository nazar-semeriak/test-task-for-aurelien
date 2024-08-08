import { fr } from "date-fns/locale";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../FormikForm.props";
import { DatePickerHelper } from "@/components/form/Messages";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/helper";
import { DateRange } from "react-day-picker";

interface CustomDatePickerProps {
  type: "single" | "range";
  helper?: React.ReactNode;
}

// export default function TextInput(props: TextInputProps & RnTextInputProps) {
export default function DatePickerInput(
  props: GFieldProps & CustomDatePickerProps
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
    type,
    ...rest
  } = props;
  const { values, setFieldValue } = useGForm();

  const onChange = (value: Date | undefined | DateRange) => {
    setFieldValue(valName, value);
  };

  const renderButtonContent = () => {
    if (type === "range") {
      const { from, to } = values[valName] || {};
      if (from && to) {
        return (
          <span>{`${formatDate(from, "fr")} - ${formatDate(to, "fr")}`}</span>
        );
      } else if (from) {
        return <span>{formatDate(from, "fr")}</span>;
      }
      return <span>Sélectionner la durée</span>;
    } else {
      return values[valName] ? (
        <span>{formatDate(values[valName], "fr")}</span>
      ) : (
        <span>Sélectionner la date</span>
      );
    }
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            size={"lg"}
            type="button"
            className={cn(
              "w-[360px] justify-start text-left font-normal",
              !values[valName] && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {renderButtonContent()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode={type}
            selected={values[valName]}
            onSelect={onChange}
            initialFocus
            locale={fr}
          />
        </PopoverContent>
      </Popover>
      {/* {props.helper && props.helper} //TODO: Check what was that ? */}
    </BaseField>
  );
}
