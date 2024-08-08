"use client";
import React from "react";
import useFormSubmit from "@/hooks/useFormSubmit";
import useSWR from "swr";
import Spinner from "@/components/Spinner";

import { fetchAxiosAPI } from "@/request/request";
import { BaseData } from "@/types/global";
import TeamForm from "@/components/form/TeamForm";

type Props = {
  params: any;
};

export const EditTeamContent = ({ params: { id } }: Props) => {
  const { handleEdit, showSuccessMessage } = useFormSubmit(`/teams/${id}`);

  const { data: teamData } = useSWR<BaseData>(`/teams/${id}`, (url: string) =>
    fetchAxiosAPI(url)
  );
  if (!teamData) return <Spinner />;

  const team = teamData.data;

  const initialValues = {
    ...team,

    title: team.title || "",
    contentRTE: team.contentRTE ? JSON.parse(team.contentRTE) : null,
  };

  return (
    <TeamForm
      initialValues={initialValues}
      showSuccessMessage={showSuccessMessage}
      onSubmit={handleEdit}
    />
  );
};
