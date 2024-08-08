import type { Metadata } from "next";
import { SettingsPageContent } from "./SettingsPageContent";

export const metadata: Metadata = {
  title: "Settings",
};

export default function TeamsPage() {
  return <SettingsPageContent />;
}
