import type { Metadata } from "next";
import { EditActualityContent } from "./EditActualityContent";

type Props = {
  id: string;
  initialData: any;
  params: any;
};

export const metadata: Metadata = {
  title: "Editer une actualité",
};

export default function EditActualityPage({ params }: Props) {
  return <EditActualityContent params={params} />;
}
