"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function SessionBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="p-2">
        <hr className="py-2" />
        <b>{session?.user?.email}</b>
        <Button className="my-4" onClick={() => signOut()}>
          Se déconnecter
        </Button>
      </div>
    );
  }
  return null;
  // return (
  //   <>
  //     Not signed in <br />
  //     <button onClick={() => signIn()}>Sign in</button>
  //   </>
  // );
}
