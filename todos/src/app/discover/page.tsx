"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import Link from "next/link";
import girl from "../../public/HomeGirl.webp";
import logo42 from "../../../public/logo42.png";
import logoGoogle from "../../../public/logoGoogle.webp";
import logo from "../../../public/logo.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Gender from "../../Personalcomponents/GenderSelect";
import TypingAnimation from "../../Personalcomponents/typeAnimation";
import { useEffect, useRef, useState } from "react";
import {
  LayoutListIcon,
  ListTodo,
  ListChecks,
  BadgeXIcon,
  CalendarClock,
  SquarePen,
} from "lucide-react";

import { useForm, SubmitHandler } from "react-hook-form";
import { signupFormInput, signinFormInput } from "../_types/typeSign";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchSignup } from "../_api/fetchSign";
import { useRouter } from "next/navigation";
import { ButtonWithIcon } from "@/components/ButtonWithIcon";
import { DatePickerButton } from "@/components/Calendar";
import { PopoverInsert, PopoverUpdate } from "../../components/PopoverButton";
import { useSession } from "next-auth/react";
import { Todo, User } from "@prisma/client";
import axios from "axios";
import { useGlobalContext } from "@/Providers/GlobalContext";
import { typeTodo } from "../_types/typeTodo";
export default function SignForm() {
  const { user } = useGlobalContext();

  const fetchTodosData = async (userId: string) => {
    const response = await axios.get(`/api/todos/${userId}`);
    return response.data;
  };

  const {
    isPending: isPendingTodos,
    isError: isErrorTodos,
    data: dataTodos,
    error: errorTodos,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => {
      if (user) return fetchTodosData(user.id_user);
      else console.log("fail");
      return;
    },
    enabled: !!user,
  });

  return (
    <div className="w-full h-full justify-start lg:justify-center  px-8 flex space-x-10 lg:space-x-24 items-center min-w-[1600px] overflow-x-auto">
      <div className="flex flex-col justify-around items-center w-[25%] h-[90%] space-y-5">
        <div className="flex space-x-2">
          <LayoutListIcon className="text-palette-primary w-[30px] h-[30px]" />
          <div className="text-palette-primary font-raleway font-bold text-xl">
            To Do
          </div>
        </div>
        <div
          className="border border-solid 
        border-palette-beige w-full h-[1117px] bg-palette-background flex flex-col items-center rounded-[40px] p-5 space-y-5"
        >
          <PopoverInsert
            type={"TODO"}
            bg="bg-palette-primary"
            text="text-palette-primary"
          />

          <div className="w-[80%] border-[0.5px] border-primary"></div>
          <div className="w-full h-full flex flex-col items-center overflow-y-auto p-5 space-y-5">
            {dataTodos?.map(
              (todo: Todo) =>
                todo.type == "TODO" && (
                  <div
                    key={todo.id_todo}
                    className="border border-solid border-palette-beige w-full h-fit bg-palette-white flex flex-col rounded-[16px] p-4 lg-p-6 pl-10 space-y-5"
                  >
                    <BadgeXIcon className="flex self-end" />
                    <div className="text-palette-primary font-raleway font-bold text-xl">
                      {todo.title}
                    </div>
                    <div className="flex space-x-3">
                      {todo.due_at && (
                        <CalendarClock className="text-palette-placeholder w-[20px] h-20px" />
                      )}
                      <div className="text-palette-placeholder font-raleway font-bold text-sm">
                        {todo.due_at &&
                          (() => {
                            const dueDate = new Date(todo.due_at);
                            return `${dueDate.getDate()} - ${
                              dueDate.getMonth() + 1
                            } - ${dueDate.getFullYear()}`;
                          })()}
                      </div>
                    </div>
                    <p className="font-raleway font-bold text-sm text-palette-black opacity-60">
                      {todo.description}
                    </p>
                    <PopoverUpdate
                      id={todo.id_todo}
                      bg="bg-palette-primary"
                      text="text-palette-primary"
                      type={"TODO"}
                      descriptionData={todo.description || ""}
                      taskNameData={todo.title}
                      dateData={todo.due_at}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-around items-center w-[25%] h-[90%] space-y-5">
        <div className="flex space-x-2">
          <ListTodo className="text-palette-onGoing w-[30px] h-[30px]" />
          <div className="text-palette-onGoing font-raleway font-bold text-xl">
            On Going
          </div>
        </div>
        <div
          className=" border border-solid 
        border-palette-beige w-full h-[1117px] bg-palette-background flex flex-col items-center rounded-[40px] p-5 space-y-5"
        >
          <PopoverInsert
            type={"ONGOING"}
            bg="bg-palette-onGoing"
            text="text-palette-onGoing"
          />

          <div className="w-[80%] border-[0.5px] border-primary"></div>
          <div className="w-full h-full flex flex-col items-center overflow-y-auto p-5 space-y-5">
            {dataTodos?.map(
              (todo: Todo) =>
                todo.type === "ONGOING" && (
                  <div
                    key={todo.id_todo}
                    className="border border-solid border-palette-beige w-full h-fit bg-palette-white flex flex-col rounded-[16px] p-4 lg-p-6 pl-10 space-y-5"
                  >
                    <BadgeXIcon className="flex self-end" />
                    <div className="text-palette-onGoing font-raleway font-bold text-xl">
                      {todo.title}
                    </div>
                    <div className="flex space-x-3">
                      {todo.due_at && (
                        <CalendarClock className="text-palette-placeholder w-[20px] h-20px" />
                      )}
                      <div className="text-palette-placeholder font-raleway font-bold text-sm">
                        {todo.due_at &&
                          (() => {
                            const dueDate = new Date(todo.due_at);
                            return `${dueDate.getDate()} - ${
                              dueDate.getMonth() + 1
                            } - ${dueDate.getFullYear()}`;
                          })()}
                      </div>
                    </div>
                    <p className="font-raleway font-bold text-sm text-palette-black opacity-60">
                      {todo.description}
                    </p>
                    <PopoverUpdate
                      id={todo.id_todo}
                      bg="bg-palette-onGoing"
                      text="text-palette-onGoing"
                      type={"ONGOING"}
                      descriptionData={todo.description || ""}
                      taskNameData={todo.title}
                      dateData={todo.due_at}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-around items-center w-[25%] h-[90%] space-y-5">
        <div className="flex space-x-2">
          <ListChecks className="text-palette-done w-[30px] h-[30px]" />
          <div className="text-palette-done font-raleway font-bold text-xl">
            Done
          </div>
        </div>
        <div
          className=" border border-solid 
        border-palette-beige w-full h-[1117px] bg-palette-background flex flex-col items-center rounded-[40px] p-5 space-y-5"
        >
          <PopoverInsert
            type={"DONE"}
            bg="bg-palette-done"
            text="text-palette-done"
          />

          <div className="w-[80%] border-[0.5px] border-primary"></div>
          <div className="w-full h-full flex flex-col items-center overflow-y-auto p-5 space-y-5">
            {dataTodos?.map(
              (todo: Todo) =>
                todo.type === "DONE" && (
                  <div
                    key={todo.id_todo}
                    className="border border-solid border-palette-beige w-full h-fit bg-palette-white flex flex-col rounded-[16px] p-4 lg-p-6 pl-10 space-y-5"
                  >
                    <BadgeXIcon className="flex self-end" />
                    <div className="text-palette-done font-raleway font-bold text-xl">
                      {todo.title}
                    </div>
                    <div className="flex space-x-3">
                      {todo.due_at && (
                        <CalendarClock className="text-palette-placeholder w-[20px] h-20px" />
                      )}
                      <div className="text-palette-placeholder font-raleway font-bold text-sm">
                        {todo.due_at &&
                          (() => {
                            const dueDate = new Date(todo.due_at);
                            return `${dueDate.getDate()} - ${
                              dueDate.getMonth() + 1
                            } - ${dueDate.getFullYear()}`;
                          })()}
                      </div>
                    </div>
                    <p className="font-raleway font-bold text-sm text-palette-black opacity-60">
                      {todo.description}
                    </p>
                    <PopoverUpdate
                      id={todo.id_todo}
                      bg="bg-palette-done"
                      text="text-palette-done"
                      type={"DONE"}
                      descriptionData={todo.description || ""}
                      taskNameData={todo.title}
                      dateData={todo.due_at}
                    />
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
