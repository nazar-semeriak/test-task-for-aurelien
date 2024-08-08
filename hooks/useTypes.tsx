import useSWR from "swr";
import { fetchAxiosAPI } from "@/request/request";

//DOC: parametre or string ? see useFormSubmit
const useTypes = ({ url = "actualities" }) => {
  const {
    data: dataTypes,
    error,
    isLoading,
  } = useSWR(`/${url}/get-types`, fetchAxiosAPI);

  const types = dataTypes?.enum?.map((enumValue: string) => ({
    value: enumValue,
    label: enumValue,
  }));

  return {
    types,
    isLoading,
    error,
  };
};

export default useTypes;
