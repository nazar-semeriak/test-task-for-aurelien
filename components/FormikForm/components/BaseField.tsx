// import { spacing } from "theme";

"use client";
import { LightbulbIcon } from "lucide-react";
import { GFieldProps, useGForm } from "../FormikForm.props";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RiQuestionLine } from "@remixicon/react";
import RenderTx from "@/components/locale/LanguageHelper";
// import { useTranslations } from "next-intl";

function Label({ tx, text }: { tx?: string; text?: string }) {
  if (tx !== undefined || text !== undefined) {
    return (
      <label className="block mt-5 mb-2 text-primary-800 text-xl">
        <RenderTx tx={tx} text={text} />
      </label>
    );
  } else return null;
}

function ErrorLabel({ valName, ...props }: any & { valName: string }) {
  const { errors } = useGForm();
  if (errors[valName] === undefined) return null;
  return (
    <p className="text-red-500 my-1 underline decoration-red-500" {...props}>
      {errors[valName]}
    </p>
  );
}

function HintLabel({ hintText }: { hintText: string | undefined }) {
  if (!hintText) return null;
  return (
    hintText && (
      <label className="flex mb-2 items-center gap-1 text-gray-500">
        <LightbulbIcon size={16} />
        {hintText}
      </label>
    )
  );
}

function TooltipLabel({
  tooltipText,
  tooltipTx,
}: {
  tooltipText?: string | undefined;
  tooltipTx?: string | undefined;
}) {
  if (tooltipTx !== undefined || tooltipText !== undefined) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={100}>
          <TooltipTrigger>
            <RiQuestionLine className="text-primary-700" size={16} />
          </TooltipTrigger>
          <TooltipContent>
            <RenderTx tx={tooltipTx} text={tooltipText} />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
}

function isRequired({ required }: { required: boolean | undefined }) {
  if (!required) return null;
  return <span className="text-red-500 text-sm mt-4">(Requis)</span>;
}

BaseField.Label = Label;
BaseField.ErrorLabel = ErrorLabel;
BaseField.TooltipLabel = TooltipLabel;
BaseField.HintLabel = HintLabel;
BaseField.isRequired = isRequired;

export function BaseField({
  children,
  tx,
  text,
  hintText,
  tooltipText,
  tooltipTx,
  required,
  valName,
}: GFieldProps) {
  return (
    <div>
      <div className="flex justify-start gap-1">
        <BaseField.Label tx={tx} text={text} />
        <BaseField.TooltipLabel
          tooltipTx={tooltipTx}
          tooltipText={tooltipText}
        />
        <BaseField.isRequired required={required} />
      </div>

      {children}
      <BaseField.ErrorLabel valName={valName} />
      <BaseField.HintLabel hintText={hintText} />
    </div>
  );
}
