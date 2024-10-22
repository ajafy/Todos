import { Response } from "express";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
} from "../Database/Queries";
import { gender_type, User } from "../User/dto/userType";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function signin(
  username: string,
  hashed_password: string,
  res: Response
): Promise<{ data: User | null; message: string }> {
  try {
    if (!username || !hashed_password)
      return { data: null, message: "Invalide Credentials !" };
    const result: User | null = await getUserByUsername(username);
    if (!result || result === undefined)
      return { data: null, message: "Invalid username or password." };

    const token = jwt.sign(
      { id_user: result.id_user },
      `${process.env.SECRET}`,
      { expiresIn: "24h" }
    );
    res.cookie("token", token);
    return { data: result, message: "User Logged-in Succefully" };
  } catch (error) {
    console.error(error);
    throw new Error("Error from Local Signin !");
  }
}

export async function signup(
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  hashed_password: string,
  gender: gender_type,
  res: Response
): Promise<{ data: User | null; message: string }> {
  try {
    if (!username || !hashed_password || !gender || !email)
      return {
        data: null,
        message:
          "Failed to Create a User ! Username, Password, Email or Gender cannot be null",
      };

    const hash = await bcrypt.hash(hashed_password, 10);
    const sexual_preference: gender_type =
      gender === gender_type.Male ? gender_type.Female : gender_type.Male;

    const usernameUser: User | null = await getUserByUsername(username);
    if (usernameUser)
      return { data: null, message: "Username Already in use !" };
    const emailUser: User | null = await getUserByEmail(email);
    if (emailUser) return { data: null, message: "Email Already in use !" };
    const result: User | null = await createUser(
      username,
      firstname,
      lastname,
      email,
      hash,
      gender,
      sexual_preference
    );
    if (!result || result === undefined)
      return { data: null, message: "Failed to Create a User !" };
    const token = jwt.sign(
      { id_user: result.id_user },
      `${process.env.SECRET}`,
      { expiresIn: "24h" }
    );
    res.cookie("token", token);
    return { data: result, message: "User Created Succefully" };
  } catch (error) {
    console.error(error);
    throw new Error("Error from Local Signup !");
  }
}

export const loginOAuth = async (req: any, res: Response) => {
  try {
    const token = jwt.sign(
      { id_user: req.user.id_user },
      `${process.env.SECRET}`,
      { expiresIn: "24h" }
    );

    let route: string = req.user.age ? "/discover" : "/profile";
    res.cookie("token", token);
    res.redirect(`${process.env.FRONT_URL}:${process.env.FRONT_PORT}/${route}`);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to Login using Third-Party OAuth !" });
  }
};
