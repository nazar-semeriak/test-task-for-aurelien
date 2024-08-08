import type { Metadata } from "next";
import { CreateActivityContent } from "./CreateActivityContent";

export const metadata: Metadata = {
  title: "Créer une entité",
};

export default function CreateActivityPage() {
  return <CreateActivityContent />;
}
