"use client";

export enum genderType {
  Male = "MALE",
  Female = "FEMALE",
}

export interface signupFormInput {
  firstname: string;
  lastname: string;
  username: string;
  gender: genderType;
  email: string;
  hashed_password: string;
}

export interface signinFormInput {
  username: string;
  hashed_password: string;
}
