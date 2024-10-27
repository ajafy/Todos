"use client";

import { ReactNode, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session && pathname === "/") {
      router.push("/discover");
    }
  }, [session, status, router, pathname]);

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

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
