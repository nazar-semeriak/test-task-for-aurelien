import type { Metadata } from "next";
import { InfosPageContent } from "./InfosPageContent";

export const metadata: Metadata = {
  title: "Infos",
};

export default function InfosPage() {
  return <InfosPageContent />;
}
