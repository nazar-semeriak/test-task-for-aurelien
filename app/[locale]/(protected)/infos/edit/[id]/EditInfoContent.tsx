"use client";
import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSWR from "swr";
import Spinner from "@/components/Spinner";

import { fetchAxiosAPI } from "@/request/request";
import { BaseData } from "@/types/global";
import InfoForm from "@/components/form/InfoForm";

type Props = {
  params: any;
};

export const EditInfoContent = ({ params: { id } }: Props) => {
  const { handleEdit, showSuccessMessage } = useFormSubmit(`/infos/${id}`);

  const { data: infoData } = useSWR<BaseData>(
    `/infos/${id}`,
    (url: string) => fetchAxiosAPI(url),
    { refreshInterval: 10000 }
  );
  if (!infoData) return <Spinner />;

  const info = infoData.data;

  const initialValues = {
    ...info,
    title: info.title || "",
    contentRTE: info.contentRTE ? JSON.parse(info.contentRTE) : null,
  };

  return (
    <InfoForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleEdit}
    />
  );
};
