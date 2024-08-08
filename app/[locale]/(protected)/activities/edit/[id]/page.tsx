import type { Metadata } from "next";
import { EditActivityContent } from "./EditActivityContent";

type Props = {
  id: string;
  initialData: any;
  params: any;
};

export const metadata: Metadata = {
  title: "Editer une activity",
};

export default function EditActivityPage({ params }: Props) {
  return <EditActivityContent params={params} />;
}
