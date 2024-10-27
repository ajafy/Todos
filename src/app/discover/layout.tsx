import NavBarRes from "src/Personalcomponents/NavBarRes";
import Sidebar from "src/Personalcomponents/Sidebar";
import React from "react";
import GlobalProvider from "src/Providers/GlobalContext";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <GlobalProvider>
    
    <div className="w-full h-screen flex  max-lg:flex-col">
      <div className="lg:visible max-lg:hidden">
        <Sidebar></Sidebar>
      </div>
      <div className="lg:hidden max-lg:visible bg-white">
        <NavBarRes></NavBarRes>
      </div>
      <div className="w-full h-full  bg-white">{children}</div>
    </div>
    </GlobalProvider>
  );
}
