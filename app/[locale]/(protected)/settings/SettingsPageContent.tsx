"use client";

import { BaseData } from "@/types/global";

import useFormSubmit from "@/hooks/useFormSubmit";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import { fetchAxiosAPI } from "@/request/request";
import SettingForm from "@/components/form/SettingForm";

export const SettingsPageContent = () => {
  const title = "Les paramètres de l'application";

  const { handleEditContact, showSuccessMessage } = useFormSubmit(`/setting`);

  const { data: settingData } = useSWR<BaseData>(
    `/setting`,
    (url: string) => fetchAxiosAPI(url),
    { refreshInterval: 10000 }
  );
  if (!settingData) return <Spinner />;
  const setting = settingData?.data;

  const initialValues = {
    ...setting?.contact,
  };

  return (
    <>
      <SettingForm
        initialValues={initialValues}
        showSuccessMessage={showSuccessMessage}
        onSubmit={handleEditContact}
      />
    </>
  );
};
