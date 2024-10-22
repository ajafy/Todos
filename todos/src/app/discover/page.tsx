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
import { useState } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { fetchSignin, fetchSignup } from "../_api/fetchSign";
import { useRouter } from "next/navigation";
import { ButtonWithIcon } from "@/components/ButtonWithIcon";
import { DatePickerButton } from "@/components/Calendar";
import { PopoverInsert, PopoverUpdate } from "../../components/PopoverButton";
export default function SignForm() {
  const [date, setDate] = useState<Date | undefined>();
  const [taskName, settaskName] = useState<string>("Task name");
  const [description, setDescription] = useState<string>(
    "This is a sample description ."
  );
  const [selectedType, setSelectedType] = useState("TO DO");

  const [isErrorSignup, setIsErrorSignup] = useState<boolean>(false);
  const [errorSignup, setErrorSignup] = useState<string>("Something Wrong !");
  const [isErrorSignin, setIsErrorSignin] = useState<boolean>(false);
  const [errorSignin, setErrorSignin] = useState<string>("Something Wrong !");
  const router = useRouter();
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    setValue,
    reset: resetSignup,
    resetField: resetFieldSignup,
  } = useForm<signupFormInput>();
  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
    reset: resetSignin,
    resetField: resetFieldSignin,
  } = useForm<signinFormInput>();

  const mutationSignup = useMutation({
    mutationKey: ["signup"],
    mutationFn: fetchSignup,
  });
  const mutationSignin = useMutation({
    mutationKey: ["signin"],
    mutationFn: fetchSignin,
  });

  const handleSignupSubmit: SubmitHandler<signupFormInput> = async (data) => {
    setIsErrorSignup(false);
    if (!data) {
      setIsErrorSignup(true);
      return;
    }
    if (!data.gender) {
      console.log("Gender is Mandatory !");
      setIsGender(true);
      return;
    }
    mutationSignup.mutate(data, {
      onError: (error) => console.log("error => ", error),
      onSuccess: (data) => {
        if (!data.data) {
          setIsErrorSignup(true);
          setErrorSignup(data.message);
          return;
        }
        console.log(data);

        resetSignup();
        router.push("/profile");
      },
    });
  };

  const handleSigninSubmit: SubmitHandler<signinFormInput> = async (data) => {
    setIsErrorSignin(false);
    if (!data) {
      setIsErrorSignin(true);
      return;
    }
    mutationSignin.mutate(data, {
      onError: (error) => console.log("error => ", error.message),
      onSuccess: (data) => {
        console.log(data);

        if (!data.data) {
          setIsErrorSignin(true);
          setErrorSignin(data.message);
          resetFieldSignin("hashed_password");
          return;
        }
        let route: string = data.data.age ? "/{taskName}" : "/profile";
        console.log(data);
        resetSignin();
        router.push(route);
      },
    });
  };

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
            title="To Do"
            bg="bg-palette-primary"
            text="text-palette-primary"
          />

          <div className="w-[80%] border-[0.5px] border-primary"></div>
          <div className="w-full h-full flex flex-col items-center overflow-y-auto p-5 space-y-5">
            <div
              className=" border border-solid 
        border-palette-beige  w-full h-fit bg-palette-white flex flex-col rounded-[16px] p-4 lg-p-6 pl-10 space-y-5"
            >
              <BadgeXIcon className="flex self-end" />

              <div className="text-palette-primary font-raleway font-bold text-xl">
                {taskName}
              </div>
              <div className="flex space-x-3">
                {date && (
                  <CalendarClock className="text-palette-placeholder w-[20px] h-20px" />
                )}

                <div className="text-palette-placeholder font-raleway font-bold text-sm">
                  {date &&
                    date.getDay().toString() +
                      " - " +
                      date.getMonth().toString() +
                      " - " +
                      date.getFullYear().toString()}
                </div>
              </div>
              <p className="font-raleway font-bold text-sm text-palette-black opacity-60">
                {description}
              </p>
              <PopoverUpdate
                bg="bg-palette-primary"
                text="text-palette-primary"
                type="TO DO"
                descriptionData={description}
                taskNameData={taskName}
                dateData={date}
              />
            </div>
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
            title="On Going"
            bg="bg-palette-onGoing"
            text="text-palette-onGoing"
          />

          <div className="w-[80%] border-[0.5px] border-primary"></div>
          <div className="w-full h-full flex flex-col items-center overflow-y-auto p-5 space-y-5">
            <div
              className=" border border-solid 
        border-palette-beige  w-full h-fit bg-palette-white flex flex-col rounded-[16px] p-4 lg-p-6 pl-10 space-y-5"
            >
              <BadgeXIcon className="flex self-end" />

              <div className="text-palette-onGoing font-raleway font-bold text-xl">
                {taskName}
              </div>
              <div className="flex space-x-3">
                {date && (
                  <CalendarClock className="text-palette-placeholder w-[20px] h-20px" />
                )}
                <div className="text-palette-placeholder font-raleway font-bold text-sm">
                  {date &&
                    date.getDay().toString() +
                      " - " +
                      date.getMonth().toString() +
                      " - " +
                      date.getFullYear().toString()}
                </div>
              </div>
              <p className="font-raleway font-bold text-sm text-palette-black opacity-60">
                {description}
              </p>
              <PopoverUpdate
                bg="bg-palette-onGoing"
                text="text-palette-onGoing"
                type="ON GOING"
                descriptionData={description}
                taskNameData={taskName}
                dateData={date}
              />
            </div>
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
            title="Done"
            bg="bg-palette-done"
            text="text-palette-done"
          />

          <div className="w-[80%] border-[0.5px] border-primary"></div>
          <div className="w-full h-full flex flex-col items-center overflow-y-auto p-5 space-y-5">
            <div
              className=" border border-solid 
        border-palette-beige  w-full h-fit bg-palette-white flex flex-col rounded-[16px] p-4 lg-p-6 pl-10 space-y-5"
            >
              <BadgeXIcon className="flex self-end" />

              <div className="text-palette-done font-raleway font-bold text-xl">
                {taskName}
              </div>
              <div className="flex space-x-3">
                {date && (
                  <CalendarClock className="text-palette-placeholder w-[20px] h-20px" />
                )}
                <div className="text-palette-placeholder font-raleway font-bold text-sm">
                  {date &&
                    date.getDay().toString() +
                      " - " +
                      date.getMonth().toString() +
                      " - " +
                      date.getFullYear().toString()}
                </div>
              </div>
              <p className="font-raleway font-bold text-sm text-palette-black opacity-60">
                {description}
              </p>
              <PopoverUpdate
                bg="bg-palette-done"
                text="text-palette-done"
                type="DONE"
                descriptionData={description}
                taskNameData={taskName}
                dateData={date}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
