
export enum gender_type {
  MALE,
  FEMALE,
}
export enum type {
  TODO,
  ONGOING,
  DONE,
}

export interface SigninUser {
  username: string;
  password: string;
}
export interface CreateUser {
  username: string;
  fullname?: string | null;
  email: string;
  password: string;
  gender: "MALE" | "FEMALE";
}

export interface User {
  id_user: string;
  username: string;
  fullname: string | null;
  email: string;
  password: string | null;
  image: string | null;
  gender: string;
}

export interface Todo {
  id_todo: string;
  title: string;
  description: string;
  due_at: Date;
  type: type;
  created_at: Date;
  updated_at: Date;
  id_user: string;
}
