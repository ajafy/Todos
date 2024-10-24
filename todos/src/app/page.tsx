"use client";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import Link from "next/link";
import girl from "../../public/HomeGirl.webp";
import bird from "../../public/bird.webp";
import logo42 from "../../public/logo42.png";
import logoGoogle from "../../public/logoGoogle.webp";
import logo from "../../public/logo.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Gender from "../Personalcomponents/GenderSelect";
import TypingAnimation from "../Personalcomponents/typeAnimation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signupFormInput, signinFormInput } from "./_types/typeSign";
import { useMutation } from "@tanstack/react-query";
import { fetchSignup } from "./_api/fetchSign";
import { google, intra } from "@/components/oauth";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useGlobalContext } from "@/Providers/GlobalContext";

export default function SignForm() {
  const router = useRouter();
  const { user } = useGlobalContext();
  const [isSignIn, setIsSignIn] = useState<boolean>(false);
  const [isGender, setIsGender] = useState<boolean>(false);
  const [isErrorSignup, setIsErrorSignup] = useState<boolean>(false);
  const [errorSignup, setErrorSignup] = useState<string>("Something Wrong !");
  const [isErrorSignin, setIsErrorSignin] = useState<boolean>(false);
  const [errorSignin, setErrorSignin] = useState<string>("Something Wrong !");
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

  const handleSignupSubmit: SubmitHandler<signupFormInput> = async (data) => {
    setIsErrorSignup(false);
    if (!data) {
      setIsErrorSignup(true);
      return;
    }
    if (!data.gender) {
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
        resetSignup();
        setActiveTab("signin");
      },
    });
  };

  const handleSigninSubmit: SubmitHandler<signinFormInput> = async (data) => {
    setIsErrorSignin(false);
    if (!data) {
      setIsErrorSignin(true);
      return;
    }
    try {
      const username: string = data.username;
      const password: string = data.password;
      const result = await signIn("credentials", {
        redirect: false,
        username,
        password,
      });

      if (!result?.url) {
        setIsErrorSignin(true);
        setErrorSignin("Invalide Credentials !");
        resetFieldSignin("password");
        return;
      }
      router.push("/discover");
    } catch (error) {
      console.log(error);
      setIsErrorSignin(true);
      return;
    }
  };

  const [activeTab, setActiveTab] = useState("signup");

  return (
    <div className="w-screen h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-palette-background">
      <div className="space-y-10">
        <Image src={logo} alt="Logo" width={224} height={219} priority />
        <TypingAnimation
          text=" Match."
          duration={300}
          isSignIn={isSignIn}
        ></TypingAnimation>
        <div className="flex items-center justify-center min-w-[280px]">
          <div
            className="mx-auto flex w-fit gap-6 border border-solid drop-shadow-md
           border-palette-beige px-7 py-10 bg-palette-white rounded-[40px] overflow-hidden"
          >
            <div className="text-center flex">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="signup"
                className="w-fit max-w-[340px] h-[600px] rounded-[40px]"
              >
                <TabsList className="grid w-full grid-cols-2 bg-palette-background rounded-[40px]">
                  <TabsTrigger
                    className="text-palette-primary font-inter rounded-[40px] data-[state=active]:text-palette-primary data-[state=active]:bg-palette-white"
                    value="signup"
                    onClick={() => setIsSignIn(false)}
                  >
                    Sign Up
                  </TabsTrigger>
                  <TabsTrigger
                    className="text-palette-secondary font-inter rounded-[40px] data-[state=active]:text-palette-secondary data-[state=active]:bg-palette-white"
                    value="signin"
                    onClick={() => setIsSignIn(true)}
                  >
                    Sign In
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                  <form onSubmit={handleSubmitSignup(handleSignupSubmit)}>
                    <Card className="border-none shadow-none">
                      <CardHeader className="">
                        <CardDescription className="text-center text-palette-description font-inter text-sm font-extralight not-italic">
                          Enter your information to create an account
                        </CardDescription>
                      </CardHeader>
                      <div className="space-y-5">
                        <div className="flex space-x-4 w-full ">
                          <div className="w-full">
                            <Label
                              htmlFor="fullname"
                              className="flex font-inter font-medium text-sm sm:text-base leading-5 text-palette-black"
                            >
                              Full name
                            </Label>
                            <Input
                              id="fullname"
                              placeholder="Mohammed Mayaz"
                              className="border rounded-[40px]  border-solid border-palette-beige placeholder:text-palette-placeholder placeholder:font-inter placeholder:leading-5 placeholder:text-xs sm:placeholder:text-sm  placeholder:font-normal"
                              {...registerSignup("fullname", {
                                required: true,
                              })}
                            />
                          </div>
                        </div>
                        <div className="flex space-x-4 w-full">
                          <div className="w-[50%]">
                            <Label
                              htmlFor="username"
                              className="flex font-inter font-medium text-sm sm:text-base leading-5 text-palette-black"
                            >
                              Username
                            </Label>
                            <Input
                              id="username"
                              placeholder="Momayaz"
                              className="border rounded-[40px]  border-solid border-palette-beige placeholder:text-palette-placeholder placeholder:font-inter placeholder:leading-5  placeholder:text-xs sm:placeholder:text-sm placeholder:font-normal"
                              {...registerSignup("username", {
                                required: true,
                              })}
                              onChange={() => {
                                setIsErrorSignup(false);
                              }}
                            />
                          </div>
                          <div className="w-[50%]">
                            <Label
                              htmlFor="gender"
                              className="flex font-inter font-medium text-sm sm:text-base leading-5 text-palette-black"
                            >
                              Gender
                            </Label>
                            <Gender
                              className="border rounded-[40px] text-xs sm:text-sm border-solid border-palette-beige text-palette-placeholder placeholder:text-palette-placeholder placeholder:font-inter placeholder:leading-5  placeholder:text-xs sm:placeholder:text-sm placeholder:font-normal"
                              setValue={setValue}
                              setIsGender={setIsGender}
                            />
                            {isGender && (
                              <p className="text-palette-secondary text-[10px] sm:text-xs flex justify-start pl-2">
                                Gender is Mandatory
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="w-full">
                          <Label
                            htmlFor="email"
                            className="flex font-inter font-medium text-sm sm:text-base leading-5 text-palette-black"
                          >
                            Email
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="momayaz@gmail.com"
                            className="border rounded-[40px] border-solid border-palette-beige placeholder:text-palette-placeholder placeholder:font-inter placeholder:leading-5  placeholder:text-xs sm:placeholder:text-sm placeholder:font-normal"
                            {...registerSignup("email", { required: true })}
                            onChange={() => {
                              setIsErrorSignup(false);
                            }}
                          />
                        </div>
                        <div className="w-full">
                          <Label
                            htmlFor="password"
                            className="flex font-inter font-medium text-sm sm:text-base leading-5 text-palette-black"
                          >
                            Password
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="•••••••••••"
                            className="border rounded-[40px] border-solid border-palette-beige placeholder:text-palette-placeholder placeholder:font-inter placeholder:leading-5  placeholder:text-xs sm:placeholder:text-sm placeholder:font-normal"
                            autoComplete="current-password"
                            {...registerSignup("password", {
                              required: true,
                            })}
                          />
                        </div>

                        <div className="flex justify-center items-center flex-col">
                          <Button
                            className="bg-palette-primary rounded-[40px] w-[70%] text-sm font-inter font-medium"
                            type="submit"
                          >
                            Create an account
                          </Button>
                          {isErrorSignup && (
                            <p className="text-palette-secondary text-[10px] sm:text-xs flex justify-start pl-2 pt-2">
                              {errorSignup}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="w-[20%] border border-palette-placeholder opacity-40" />
                          <p className="text-palette-description text-sm sm:text-base">
                            Or Continue With
                          </p>
                          <div className="w-[20%] border border-palette-placeholder opacity-40" />
                        </div>

                        <div className="flex justify-around items-center">
                          <a
                            onClick={async () => {
                              await intra();
                              // router.push("/discover");
                            }}
                          >
                            <Image
                              src={logo42}
                              alt="42"
                              width={68}
                              height={68}
                              className="rounded-full w-[48px] h-[48px] min-[320px]:w-[68px] min-[320px]:h-[68px] drop-shadow-md border border-solid bg-palette-background"
                              priority
                            />
                          </a>
                          <a onClick={async () => await google()}>
                            <Image
                              src={logoGoogle}
                              alt="google"
                              width={68}
                              height={68}
                              className="rounded-full w-[48px] h-[48px] min-[320px]:w-[68px] min-[320px]:h-[68px] drop-shadow-md border border-solid bg-palette-background"
                              priority
                            />
                          </a>
                        </div>
                      </div>
                    </Card>
                  </form>
                </TabsContent>
                <TabsContent value="signin">
                  <form onSubmit={handleSubmitSignin(handleSigninSubmit)}>
                    <Card className="border-none shadow-none">
                      <CardHeader className="space-y-10">
                        <CardDescription className="text-center text-palette-black  font-raleway text-xl sm:text-2xl font-bold not-italic">
                          Welcome Back
                        </CardDescription>
                        <CardDescription className="text-center text-palette-description font-inter text-sm font-extralight not-italic">
                          Enter your username below to login to your account
                        </CardDescription>
                      </CardHeader>
                      <div className="space-y-7">
                        <div className="w-full">
                          <Label
                            htmlFor="username"
                            className="flex font-inter font-medium text-sm sm:text-base leading-5 text-palette-black"
                          >
                            Username
                          </Label>
                          <Input
                            id="username"
                            placeholder="Momayaz"
                            className="border rounded-[40px] border-solid border-palette-beige placeholder:text-palette-placeholder placeholder:font-inter placeholder:leading-5  placeholder:text-xs sm:placeholder:text-sm placeholder:font-normal"
                            {...registerSignin("username", { required: true })}
                            onChange={() => {
                              setIsErrorSignin(false);
                            }}
                          />
                        </div>
                        <div className="w-full">
                          <Label
                            htmlFor="password"
                            className="flex font-inter font-medium text-sm sm:text-base leading-5 text-palette-black"
                          >
                            Password
                          </Label>
                          <Input
                            id="password"
                            type="password"
                            placeholder="•••••••••••"
                            autoComplete="current-password"
                            className="border rounded-[40px] border-solid border-palette-beige placeholder:text-palette-placeholder placeholder:font-inter placeholder:leading-5  placeholder:text-xs sm:placeholder:text-sm placeholder:font-normal"
                            {...registerSignin("password", {
                              required: true,
                            })}
                            onChange={() => {
                              setIsErrorSignin(false);
                            }}
                          />
                        </div>

                        <div className="flex justify-center items-center flex-col">
                          <Button
                            className="bg-palette-secondary rounded-[40px] w-[70%] text-sm font-inter font-medium"
                            type="submit"
                          >
                            Login
                          </Button>
                          {isErrorSignin && (
                            <p className="text-palette-secondary text-[10px] sm:text-xs flex justify-start pl-2 pt-2">
                              {errorSignin}
                            </p>
                          )}
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="w-[20%] border border-palette-placeholder opacity-40" />
                          <p className="text-palette-description text-sm sm:text-base">
                            Or Continue With
                          </p>
                          <div className="w-[20%] border border-palette-placeholder opacity-40" />
                        </div>

                        <div className="flex justify-around items-center">
                          <a onClick={async () => await intra()}>
                            <Image
                              src={logo42}
                              alt="42"
                              width={68}
                              height={68}
                              className="rounded-full w-[48px] h-[48px] min-[320px]:w-[68px] min-[320px]:h-[68px] drop-shadow-md border border-solid bg-palette-background"
                              priority
                            />
                          </a>
                          <a onClick={async () => await google()}>
                            <Image
                              src={logoGoogle}
                              alt="google"
                              width={68}
                              height={68}
                              className="rounded-full w-[48px] h-[48px] min-[320px]:w-[68px] min-[320px]:h-[68px] drop-shadow-md border border-solid bg-palette-background"
                              priority
                            />
                          </a>
                        </div>
                      </div>
                    </Card>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src={bird}
          alt="Image"
          width="1920"
          height="1080"
          className="h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale"
          priority
        />
      </div>
    </div>
  );
}
