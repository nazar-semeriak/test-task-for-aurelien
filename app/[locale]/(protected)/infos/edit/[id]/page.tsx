import type { Metadata } from "next";
import { EditInfoContent } from "./EditInfoContent";

type Props = {
  id: string;
  initialData: any;
  params: any;
};

export const metadata: Metadata = {
  title: "Editer une info",
};

export default function EditInfoPage({ params }: Props) {
  return <EditInfoContent params={params} />;
}
