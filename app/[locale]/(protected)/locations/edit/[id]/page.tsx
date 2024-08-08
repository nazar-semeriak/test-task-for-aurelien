import type { Metadata } from "next";
import { EditLocationContent } from "./EditLocationContent";

type Props = {
  id: string;
  initialData: any;
  params: any;
};

export const metadata: Metadata = {
  title: "Editer une location",
};

export default function EditLocationPage({ params }: Props) {
  return <EditLocationContent params={params} />;
}
