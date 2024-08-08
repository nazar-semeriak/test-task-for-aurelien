import type { Metadata } from "next";
import { CreateActualityContent } from "./CreateActualityContent";

export const metadata: Metadata = {
  title: "Créer une actualité",
};

export default function CreateActualityPage() {
  return <CreateActualityContent />;
}
