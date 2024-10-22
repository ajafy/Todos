"use client";
import { SideBarSheet } from "@/components/sheetDemo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

export default function NavBarRes() {
  const [textSearch, setTextSearch] = useState<string>("");
  return (
    <div className="w-full h-[60px]  flex justify-between items-center px-2 bg-background ">
      <div className="">
        <SideBarSheet></SideBarSheet>
      </div>
      <div className="relative max-sm:w-[215px] sm:w-[300px] md:w-[380px] lg:w-[460px] h-[45px] flex gap-2 rounded-[30px] items-center bg-white px-2 border border-gris">
        <div className=" w-full h-full flex gap-2 rounded-[30px] items-center">
          <Search style={{ color: "#595d68" }} />
          <Input
            className="shadow-none border-none w-full h-full bg-transparent text-gris"
            type="text"
            placeholder="Search..."
            value={textSearch}
            onChange={(e) => {
              setTextSearch(e.target.value);
            }}
          />
        </div>
      </div>
      {textSearch && (
        <div className="absolute border border-gris max-sm:w-[215px] sm:w-[300px] md:w-[380px] lg:w-[460px] max-sm:h-[150px] h-[200px] top-[53px] right-2 bg-white  overflow-auto hide-scrollbar rounded-2xl">
          <div className="w-full border-b border-gris px-2 py-2 flex gap-2 items-center">
            <Image
              className=" rounded-full w-[40px] h-[40px]]"
              src={"/momayaz1.jpeg"}
              alt="user Picture"
              width={100}
              height={100}
            />
            <Label> Mohamed Mayaz</Label>
          </div>
          <div className="w-full border-b border-gris px-2 py-2 flex gap-2 items-center">
            <Image
              className=" rounded-full w-[40px] h-[40px]]"
              src={"/momayaz1.jpeg"}
              alt="user Picture"
              width={100}
              height={100}
            />
            <Label> Mohamed Mayaz</Label>
          </div>
          <div className="w-full border-b border-gris px-2 py-2 flex gap-2 items-center">
            <Image
              className=" rounded-full w-[40px] h-[40px]]"
              src={"/momayaz1.jpeg"}
              alt="user Picture"
              width={100}
              height={100}
            />
            <Label> Mohamed Mayaz</Label>
          </div>
          <div className="w-full border-b border-gris px-2 py-2 flex gap-2 items-center">
            <Image
              className=" rounded-full w-[40px] h-[40px]]"
              src={"/momayaz1.jpeg"}
              alt="user Picture"
              width={100}
              height={100}
            />
            <Label> Mohamed Mayaz</Label>
          </div>
          <div className="w-full border-b border-gris px-2 py-2 flex gap-2 items-center ">
            <Image
              className=" rounded-full w-[40px] h-[40px]]"
              src={"/momayaz1.jpeg"}
              alt="user Picture"
              width={100}
              height={100}
            />
            <Label> Mohamed Mayaz</Label>
          </div>
        </div>
      )}
    </div>
  );
}
