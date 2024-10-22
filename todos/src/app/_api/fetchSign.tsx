"use client";
import axios from "axios";
import { signupFormInput, signinFormInput } from "../_types/typeSign";

export const fetchSignup = async (data: signupFormInput) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/auth/register`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Signup ! " + error);
  }
};

export const fetchSignin = async (data: signinFormInput) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_URL}:${process.env.NEXT_PUBLIC_BACK_PORT}/auth/signin`,
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to Signin ! " + error);
  }
};
