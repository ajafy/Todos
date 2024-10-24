"use client";

export enum typeTodo {
  "TODO",
  "ONGOING",
  "DONE",
}

export interface todoFormInsert {
  title: string;
  description?: string;
  type: string;
  due_date?: Date;
  id_user: string;
}
export interface todoFormUpdate {
  title: string;
  description?: string;
  type: string;
  due_date?: Date;
  id_user: string;
  id_todo: string;
}
