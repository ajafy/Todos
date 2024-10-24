"use client";

import { ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function AuthProtect({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle
          className="animate-spin text-palette-secondary"
          size={70}
        />
      </div>
    );
  }

  if (!!session) {

    router.push("/");
  }

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
