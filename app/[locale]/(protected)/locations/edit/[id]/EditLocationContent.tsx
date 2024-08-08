"use client";
import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSWR from "swr";
import Spinner from "@/components/Spinner";

import { fetchAxiosAPI } from "@/request/request";
import { BaseData } from "@/types/global";
import LocationForm from "@/components/form/LocationForm";
import { LocationData } from "@/types/location";

type Props = {
  params: any;
};

export const EditLocationContent = ({ params: { id } }: Props) => {
  const { handleEdit, showSuccessMessage } = useFormSubmit(`/locations/${id}`);

  const { data: locationData } = useSWR<LocationData>(
    `/locations/${id}`,
    (url: string) => fetchAxiosAPI(url)
  );
  if (!locationData) return <Spinner />;

  const location = locationData.data;

  const initialValues = {
    ...location,

    title: location.title || "",
    contentRTE: location.contentRTE ? JSON.parse(location.contentRTE) : null,
  };

  return (
    <LocationForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleEdit}
    />
  );
};
