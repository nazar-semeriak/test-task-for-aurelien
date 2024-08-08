"use client";
import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSWR from "swr";
import Spinner from "@/components/Spinner";

import { fetchAxiosAPI } from "@/request/request";
import { BaseData } from "@/types/global";
import ActivityForm from "@/components/form/ActivityForm";

type Props = {
  params: any;
};

export const EditActivityContent = ({ params: { id } }: Props) => {
  const { handleEdit, showSuccessMessage } = useFormSubmit(`/activities/${id}`);

  const { data: activityData } = useSWR<BaseData>(
    `/activities/${id}`,
    (url: string) => fetchAxiosAPI(url)
  );
  if (!activityData) return <Spinner />;

  const activity = activityData.data;

  const initialValues = {
    ...activity,
    title: activity.title || "",
  };

  return (
    <ActivityForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleEdit}
    />
  );
};
