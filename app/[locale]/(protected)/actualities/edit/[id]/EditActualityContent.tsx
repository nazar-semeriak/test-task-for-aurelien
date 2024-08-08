"use client";
import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import { ActualityData } from "@/types/actuality";
import ActualityForm from "@/components/form/ActualityForm";
import { fetchAxiosAPI } from "@/request/request";
import { FormValues } from "@/types/global";

type Props = {
  params: any;
};

export const EditActualityContent = ({ params: { id } }: Props) => {
  const { handleEdit, showSuccessMessage } = useFormSubmit(
    `/actualities/${id}`
  );

  const { data: actualityData } = useSWR<ActualityData>(
    `/actualities/${id}`,
    (url: string) => fetchAxiosAPI(url)
  );
  if (!actualityData) return <Spinner />;

  const actuality = actualityData.data;

  const initialValues: FormValues = {
    ...actuality,
    title: actuality.title || "",
    type: actuality.type,
  };

  return (
    <ActualityForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleEdit}
    />
  );
};
