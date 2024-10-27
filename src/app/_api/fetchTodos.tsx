"use client";
import axios from "axios";
import {
  todoFormDelete,
  todoFormInsert,
  todoFormUpdate,
} from "../_types/typeTodo";

export const createTodo = async (data: todoFormInsert) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/todos/insert`,
      data,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);

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
    console.error(error);

    throw new Error("Failed to Update Todo ! " + error);
  }
};

export const deleteTodo = async (id_todo :string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_URL}:${process.env.NEXT_PUBLIC_PORT}/api/todos/delete/${id_todo}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error(error);

    throw new Error("Failed to Delete Todo ! " + error);
  }
};
