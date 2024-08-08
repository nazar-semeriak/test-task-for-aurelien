import type { Metadata } from "next";
import { LocationsPageContent } from "./LocationsPageContent";

export const metadata: Metadata = {
  title: "Locations",
};

export default function LocationsPage() {
  return <LocationsPageContent />;
}
