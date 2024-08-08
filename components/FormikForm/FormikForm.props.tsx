import { FormikErrors } from "formik";

import { createContext, useContext } from "react";

export type GFieldProps = {
  valName: string;
  tx?: string;
  placeholderTx?: string;
  text?: string;
  hintText?: string;
  tooltipText?: string;
  tooltipTx?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  children?: React.ReactNode;
  containerStyle?: React.CSSProperties;
};

export type GFormProps = {
  containerStyle?: React.CSSProperties;
  // txOptions?: i18n.TranslateOptions;
};

type ContextProps = {
  handleChange: any;

  handleBlur: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<any>>;
  handleSubmit: (e: any) => void;
  values: { [key: string]: any };
  errors: any;
  setFieldError: (field: string, error: string) => void;
  validateField: (e: any) => void;
  isSubmitting: boolean;
  //   themeColor?: ThemeColorType;
};

export const GFormContext = createContext<ContextProps>({} as ContextProps);
export const useGForm = () => useContext(GFormContext);
