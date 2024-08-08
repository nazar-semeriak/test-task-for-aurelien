import type { Metadata } from "next";
import { ActualitiesPageContent } from "./ActualitiesPageContent";

export const metadata: Metadata = {
  title: "Actualités",
};

export default async function ActualitiesPage() {
  return <ActualitiesPageContent />;
}
