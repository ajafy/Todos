"use client";
import Image from "next/image";
import React from "react";
import { DoorOpen, CircleUser } from "lucide-react";
import { useGlobalContext } from "src/Providers/GlobalContext";
import { signOut } from "next-auth/react";
export default function Sidebar() {
  const { user } = useGlobalContext();

  return (
    <div className=" w-[262px]  h-screen flex flex-col items-center overflow-auto gap-10 max-lg:py-5">
      <div className="w-full flex items-center justify-center">
        <Image
          src={"/todos.png"}
          className="py-10 w-auto h-auto"
          alt="picture logo"
          height={150}
          width={150}
          priority
        />
      </div>
      <div className="w-full h-full flex flex-col  items-center justify-between py-10">
        <div className="w-full h-fit flex flex-col space-y-6 items-center ">
          <div className="flex items-center">
            <CircleUser className="w-[100px] h-[100px] text-palette-placeholder"/>
          </div>

          <span
            className={`text-palette-description text-[18px] lg:text-[16px] self-center max-lg:text-[14px] subpixel-antialiased`}
          >
            {user?.fullname || "Mohammed Mayaz"}
          </span>
        </div>

        <div className="w-[90%] flex flex-col items-center gap-8">
          <div className="w-[80%] border-[0.5px] border-primary "></div>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            className="flex gap-5"
          >
            <div>
              <DoorOpen style={{ color: "#4a11eb" }} />
            </div>
            <span className="text-palette-description font-semibold">
              Log out
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
