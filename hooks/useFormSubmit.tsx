// hooks/useFormSubmit.js or wherever you store your custom hooks

import { useRouter } from "next/navigation";
import { FormikHelpers } from "formik";
import { postAxiosAPI, putAxiosAPI } from "@/request/request";
import { formDataContact, formDataImg } from "@/components/form/FormHelpers";
import { FormValues } from "@/types/global";
import { useState } from "react";
import useSWR, { mutate } from "swr";
import { useSession } from "next-auth/react";
// Adjust the import path as needed

const useFormSubmit = (apiUrl: string) => {
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { data: session } = useSession() as any;

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      actions.setSubmitting(true);
      const formData = await formDataImg(values);

      await postAxiosAPI(apiUrl, formData, session?.jwt);
      mutate(apiUrl);

      setShowSuccessMessage(true);
      actions.setSubmitting(false);

      setTimeout(() => {
        router.back();
        // setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      actions.setSubmitting(false);
    }
  };

  const handleEdit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const formData = await formDataImg(values);
      await putAxiosAPI(apiUrl, formData);
      setShowSuccessMessage(true);
      actions.setSubmitting(false);

      setTimeout(() => {
        // router.back();
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      actions.setSubmitting(false);
    }
  };
  const handleEditContact = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      const formData = await formDataContact(values);
      await putAxiosAPI(apiUrl, formData);
      setShowSuccessMessage(true);
      actions.setSubmitting(false);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      actions.setSubmitting(false);
    }
  };

  return { handleSubmit, handleEditContact, handleEdit, showSuccessMessage };
};

export default useFormSubmit;
