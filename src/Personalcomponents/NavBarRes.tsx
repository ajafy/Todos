"use client";
import { SideBarSheet } from "src/components/sheetDemo";
import React from "react";

export default function NavBarRes() {
  return (
    <div className="w-full h-[60px] flex justify-between items-center px-2 bg-background ">
      <div>
        <SideBarSheet></SideBarSheet>
      </div>
    
    </div>
  );
}
