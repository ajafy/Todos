import { signIn } from "next-auth/react";
import { signinFormInput } from "../app/_types/typeSign";

export const google = async () => {
  return await signIn("google");
};

export const intra = async () => {
  return await signIn("42-school");
};
export const local = async ({ data }: { data: signinFormInput }) => {
  try {
    const username: string = data.username;
    const password: string = data.password;
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    return { data: result, message: "Invalide Credentials !" };
  } catch (error) {
    return { data: null, message: `Invalide Credentials ! + ${error}` };
  }
};
