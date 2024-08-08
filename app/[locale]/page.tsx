import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      {/* <RenderTx tx="General.loading" /> */}
      {session?.user ? redirect("/actualities") : redirect("/login")}
    </>
  );
}
