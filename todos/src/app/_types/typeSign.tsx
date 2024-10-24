"use client";

export enum genderType {
  Male = "MALE",
  Female = "FEMALE",
}

export interface signupFormInput {
  fullname: string;
  username: string;
  gender: genderType;
  email: string;
  password: string;
}

export interface signinFormInput {
  username: string;
  password: string;
}
