import type { Metadata } from "next";
import { ActivitiesPageContent } from "./ActivitiesPageContent";

export const metadata: Metadata = {
  title: "Activities",
};

export default function ActivitiesPage() {
  return <ActivitiesPageContent />;
}
