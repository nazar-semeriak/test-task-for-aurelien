import type { Metadata } from "next";
import { CreateInfoContent } from "./CreateInfoContent";

export const metadata: Metadata = {
  title: "Créer une entité",
};

export default function CreateInfoPage() {
  return <CreateInfoContent />;
}
