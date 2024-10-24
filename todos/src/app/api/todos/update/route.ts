import prisma from "../../prisma";
import { NextResponse } from "next/server";
import { todoFormUpdate, typeTodo } from "@/app/_types/typeTodo";
import { auth } from "auth";
import { Type } from "@prisma/client";

async function handler(req: Request) {
  if (
    req.method === "PUT" &&
    req.url &&
    req.url.endsWith("/api/todos/update")
  ) {
    try {
      const {
        title,
        description,
        due_date,
        type,
        id_user,
        id_todo,
      }: todoFormUpdate = await req.json();

      const session = await auth();

      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (session.user?.id !== id_user) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      if (!title || !type || !id_user || !id_todo) {
        return NextResponse.json(
          {
            message: "Failed to Update a Todo ! Title or Type cannot be null",
          },
          { status: 400 }
        );
      }
      if (type !== "TODO" && type !== "ONGOING" && type !== "DONE")
        return NextResponse.json(
          {
            message:
              "Failed to Update a Todo ! Type must be Todo, Ongoing or Done !",
          },
          { status: 400 }
        );

      const type_: Type = type as Type;
      const user = await prisma.user.findUnique({
        where: { id_user },
      });

      if (!user) {
        return NextResponse.json(
          {
            message: "No such User !",
          },
          { status: 404 }
        );
      }

      const old_todo = await prisma.todo.findUnique({
        where: { id_todo },
      });

      if (!old_todo) {
        return NextResponse.json(
          {
            message: "No such Todo !",
          },
          { status: 404 }
        );
      }
      if (old_todo.id_user !== id_user) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      const todo = await prisma.todo.update({
        where: { id_todo: old_todo.id_todo },
        data: {
          title,
          description,
          due_at: due_date,
          type: type_,
        },
      });

      if (!todo) {
        return NextResponse.json(
          {
            message: "Failed To Update a Todo !",
          },
          { status: 500 }
        );
      }
      const response = NextResponse.json(
        {
          data: todo,
          message: "Todo updated successfully",
        },
        { status: 201 }
      );

      return response;
    } catch (error) {
      console.log(error);

      return NextResponse.json(
        { message: "Failed to Update a todo !" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Not Found !" }, { status: 404 });
  }
}

export { handler as PUT };
