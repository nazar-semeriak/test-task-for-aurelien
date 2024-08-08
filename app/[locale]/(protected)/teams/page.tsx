import type { Metadata } from "next";
import { TeamsPageContent } from "./TeamsPageContent";

export const metadata: Metadata = {
  title: "Teams",
};

export default function TeamsPage() {
  return <TeamsPageContent />;
}
