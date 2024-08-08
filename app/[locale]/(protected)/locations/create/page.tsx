import type { Metadata } from "next";
import { CreateLocationContent } from "./CreateLocationContent";

export const metadata: Metadata = {
  title: "Créer une entité",
};

export default function CreateLocationPage() {
  return <CreateLocationContent />;
}
