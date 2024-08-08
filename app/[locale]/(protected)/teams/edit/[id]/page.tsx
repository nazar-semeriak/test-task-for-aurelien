import type { Metadata } from "next";
import { EditTeamContent } from "./EditTeamContent";

type Props = {
  id: string;
  initialData: any;
  params: any;
};

export const metadata: Metadata = {
  title: "Editer une team",
};

export default function EditTeamPage({ params }: Props) {
  return <EditTeamContent params={params} />;
}
