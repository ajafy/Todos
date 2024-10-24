"use client";
import axios from "axios";
import { todoFormInsert, todoFormUpdate } from "../_types/typeTodo";
import { User } from "@prisma/client";

export const createTodo = async (data: todoFormInsert) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/todos/insert`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Insert Todo ! " + error);
  }
};

export const updateTodo = async (data: todoFormUpdate) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/todos/update`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to Update Todo ! " + error);
  }
};
