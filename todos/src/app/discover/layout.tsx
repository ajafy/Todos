import { SideBarSheet } from "@/components/sheetDemo";
import NavBarRes from "@/Personalcomponents/NavBarRes";
import Sidebar from "@/Personalcomponents/Sidebar";
import React from "react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { LoaderCircle } from "lucide-react";
import AuthProtect from "@/Providers/AuthProtect";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
      <div className="w-full h-screen flex  max-lg:flex-col">
        <div className="lg:visible max-lg:hidden">
          <Sidebar></Sidebar>
        </div>
        <div className="lg:hidden max-lg:visible bg-white">
          {/* <SideBarSheet></SideBarSheet> */}
          <NavBarRes></NavBarRes>
        </div>
        <div className="w-full h-full  bg-white">{children}</div>
      </div>
  );
}
