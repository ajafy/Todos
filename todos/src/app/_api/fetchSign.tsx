"use client";
import axios from "axios";
import { signupFormInput } from "../_types/typeSign";

export const fetchSignup = async (data: signupFormInput) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/auth/register`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Signup ! " + error);
  }
};
