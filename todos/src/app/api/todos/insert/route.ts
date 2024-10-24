import prisma from "../../prisma";
import { NextResponse } from "next/server";
import { todoFormInsert } from "@/app/_types/typeTodo";
import { auth } from "auth";

async function handler(req: Request) {
  if (
    req.method === "POST" &&
    req.url &&
    req.url.endsWith("/api/todos/insert")
  ) {
    try {
      const { title, description, due_date, type, id_user }: todoFormInsert =
        await req.json();

      const session = await auth();

      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }

      if (session.user?.id !== id_user) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      if (!title || !type || !id_user)
        return NextResponse.json(
          {
            message: "Failed to Create a Todo ! Title or Type cannot be null",
          },
          { status: 400 }
        );
      if (type !== "TODO" && type !== "ONGOING" && type !== "DONE")
        return NextResponse.json(
          {
            message:
              "Failed to Create a Todo ! Type must be Todo, Ongoing or Done !",
          },
          { status: 400 }
        );

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

      const todo = await prisma.todo.create({
        data: {
          title: title,
          description: description,
          due_at: due_date,
          id_user: id_user,
          type: type,
        },
      });

      if (!todo) {
        return NextResponse.json(
          {
            message: "Failed To Create a Todo !",
          },
          { status: 500 }
        );
      }
      const response = NextResponse.json(
        {
          data: user,
          message: "Todo created successfully",
        },
        { status: 201 }
      );

      return response;
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to create a todo !" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Not Found !" }, { status: 404 });
  }
}

export { handler as POST };
