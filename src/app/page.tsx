"use client";
import { Button } from "src/components/ui/button";
import { Card, CardDescription, CardHeader } from "src/components/ui/card";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";

import Image from "next/image";
import bird from "../../public/bird.webp";
import logo from "../../public/todos.png";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import Gender from "../Personalcomponents/GenderSelect";
import TypingAnimation from "../Personalcomponents/typeAnimation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { signupFormInput, signinFormInput } from "./_types/typeSign";
import { useMutation } from "@tanstack/react-query";
import { fetchSignup } from "./_api/fetchSign";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignForm() {
  const router = useRouter();

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
  } = useForm<signupFormInput>();
  const {
    register: registerSignin,
    handleSubmit: handleSubmitSignin,
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
      onError: (error) => console.error("error => ", error),
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
      console.error(error);
      setIsErrorSignin(true);
      return;
    }
  };

  const [activeTab, setActiveTab] = useState("signup");

  return (
    <div className="w-screen h-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] bg-palette-background">
      <div className="space-y-20">
        <Image
          src={logo}
          alt="Logo"
          width={224}
          height={219}
          priority
          className="p-10"
        />
        <TypingAnimation
          text=" Tasks"
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
                className="w-fit max-w-[340px] h-[500px] rounded-[40px]"
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
                      <div className="space-y-10">
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
