import type { Metadata } from "next";
import LoginContent from "./LoginContent";

export const metadata: Metadata = {
  title: "Connectez-vous",
};

export default function LoginPage() {
  return <LoginContent />;
}
