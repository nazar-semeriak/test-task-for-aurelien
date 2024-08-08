import { fr } from "date-fns/locale";

import { BaseField } from "./BaseField";
import { GFieldProps, useGForm } from "../FormikForm.props";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDateTime, localeToDateLocale } from "@/lib/helper";
import { DateRange } from "react-day-picker";

import { TimePicker } from "@/components/ui/time-picker";
import { useLocale } from "next-intl";

interface CustomDatePickerProps {
  helper?: React.ReactNode;
}

// export default function TextInput(props: TextInputProps & RnTextInputProps) {
export default function DatePickerInput(
  props: GFieldProps & CustomDatePickerProps
) {
  const {
    valName,
    text,
    placeholder = "Sélectionner la date",
    tx,
    placeholderTx,
    hintText,
    tooltipText,
    tooltipTx,
    required,
    type,
  } = props;
  const { values, setFieldValue } = useGForm();

  const onChange = (value: Date | undefined | DateRange) => {
    setFieldValue(valName, value);
  };

  const locale = useLocale();

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
            {values[valName] ? (
              formatDateTime(values[valName], locale)
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={values[valName]}
            onSelect={onChange}
            initialFocus
            locale={localeToDateLocale(locale)}
          />
          <div className="p-3 border-t border-border">
            <TimePicker date={values[valName]} setDate={onChange} />
          </div>
        </PopoverContent>
      </Popover>
    </BaseField>
  );
}
