import { useGForm } from "@/components/FormikForm/FormikForm.props";
import { PhonePreview } from "@/components/elements/PhonePreview";
import { FormValues } from "@/types/global";
import FormikForm from "../FormikForm/FormikForm";
import { TextSuccessMessage } from "./Messages";

//not sure to use that
export function generateInitialValues(data: FormValues) {
  return {
    ...data,
    title: data?.title || "",
    type: data?.type,
  };
}

export const FormContent = ({
  children,
  previewType,
  showSuccessMessage,
  saveDraft = false,
}: {
  //TS: any
  types?: any;
  isLoading?: any;
  error?: any;
  previewType?:
    | "activities"
    | "actualities"
    | "locations"
    | "infos"
    | "settings"
    | "bidoums"
    | "teams";
  showSuccessMessage?: any;
  saveDraft?: boolean;
  children: any; //TODO: Maybe there is a way to get FormikForm children type
}) => {
  const { values } = useGForm();

  return (
    <div className="flex">
      <div className="w-3/5 my-3 px-4">
        <div className="grid grid-cols-2 gap-4">{children}</div>
        {showSuccessMessage && <TextSuccessMessage />}
        <FormikForm.SubmitButton
          className="my-4"
          saveDraft={saveDraft}
          type="submit"
        />
      </div>
      {previewType && (
        <div className="w-2/5 mt-4 text-center">
          <PhonePreview previewType={previewType} entity={values} />
        </div>
      )}
    </div>
  );
};

export const formDataImg = async (values: FormValues) => {
  const formData = new FormData();
  const newValues = {
    ...values,

    // publishedAt:
    //   values.publishedDate && values.publishedDate <= new Date()
    //     ? values.publishedDate
    //     : new Date(),

    publishedAt:
      values.publishedDate && new Date(values.publishedDate) <= new Date()
        ? values.publishedDate
        : null,

    cover: null,
    avatar: null,
    latitude: values.location?.latitude,
    longitude: values.location?.longitude,
    address: values.location?.address,
  };

  formData.append("data", JSON.stringify(newValues));

  if (values.cover && values.cover[0] instanceof File) {
    formData.append("files.cover", values.cover[0], values.cover[0].name);
  }
  if (values.avatar && values.avatar[0] instanceof File) {
    formData.append("files.avatar", values.avatar[0], values.avatar[0].name);
  }

  return formData;
};

export const formDataContact = async (values: FormValues) => {
  const formData = new FormData();
  const newValues = {
    contact: {
      phone: values.phone,
      mail: values.mail,
      website: values.website,
    },
  };
  formData.append("data", JSON.stringify(newValues));

  return formData;
};
