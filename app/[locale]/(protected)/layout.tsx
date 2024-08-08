import SidebarNavigation from "@/components/section/SidebarNavigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //TODO: Check user role not only session
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/login");
  }

  //DOC: CLIENT SIDE SESSION AUTH
  //   const { data: session } = useSession();
  //   if (typeof window === "undefined") return null;
  //   if (!session || !session.user) {
  //     <p>Access Denied</p>;
  //   }

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-start ">
        <div className="w-2/12 ">
          <SidebarNavigation />
          {/* <NavMenu /> */}
        </div>
        <div className="w-10/12 flex">{children}</div>
      </div>
    </div>
  );
}
