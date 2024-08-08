import type { Metadata } from "next";
import { CreateTeamContent } from "./CreateTeamContent";

export const metadata: Metadata = {
  title: "Créer une entité",
};

export default function CreateTeamPage() {
  return <CreateTeamContent />;
}
