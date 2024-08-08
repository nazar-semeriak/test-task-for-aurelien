import React from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";

import { BaseField } from "./BaseField";
import { useGForm } from "../FormikForm.props";
import { Input } from "@/components/ui/input";

export default function AddressPicker(props: any) {
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

  const { setFieldValue, values } = useGForm();

  const handlePlaceSelected = async (place: any) => {
    if (place) {
      setFieldValue(valName, {
        latitude: place?.geometry?.location?.lat(),
        longitude: place?.geometry?.location?.lng(),
        address: place?.formatted_address,
      });
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
      <ReactGoogleAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
        onPlaceSelected={handlePlaceSelected}
        options={{
          types: ["address"],
          componentRestrictions: { country: "ch" },
        }}
        defaultValue={values[valName]?.address}
        placeholder={placeholder}
        className="flex h-10 w-[360px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        {...rest}
      />

      {/* //TODO: Add the poossibility to add latittude and longitude directly if the address is not found */}
      {/* <div className="flex flex-col mt-2">
        <Input
          // onChange={handleChange(valName)}
          // value={values[valName]}
          placeholder={placeholder}
          {...rest}
        />
      </div> */}
    </BaseField>
  );
}
