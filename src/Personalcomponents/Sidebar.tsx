"use client";
import Image from "next/image";
import React from "react";
import { DoorOpen } from "lucide-react";
import { useGlobalContext } from "src/Providers/GlobalContext";
import { signOut } from "next-auth/react";
export default function Sidebar() {
  const { user } = useGlobalContext();
  return (
    <div className="max-lg:w-[150px] lg:w-[200px]  xl:w-[262px]  h-screen flex flex-col items-center overflow-auto  gap-10">
      <div className="w-full h-[137px] flex items-center justify-center">
        <Image
          src={"/todos.png"}
          className="w-[60%] h-[137px] "
          alt="picture logo"
          height={100}
          width={100}
        />
      </div>
      <div className="w-full h-full flex flex-col  items-center justify-between py-10">
        <div className="w-full h-fit flex flex-col space-y-6 items-center ">
          <div className="flex items-center">
            <Image
              className=" rounded-full lg:w-[65px] lg:h-[65px] max-lg:w-[55px] max-lg:h-[55px]"
              src={user?.image || "/momayaz1.jpeg"}
              alt="user Picture"
              width={100}
              height={100}
            />
          </div>

          <span
            className={`text-palette-description text-[18px] lg:text-[16px] self-center max-lg:text-[14px] subpixel-antialiased`}
          >
            {user?.fullname || "Mohammed Mayaz"}
          </span>
        </div>

        <div className="w-[90%] flex flex-col items-center gap-8">
          <div className="w-[60%] border-[0.5px] border-primary "></div>
          <button
            onClick={() => signOut()}
            className="w-[50%] flex gap-5"
          >
            <div className="">
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
