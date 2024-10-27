import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "auth";

const prisma = new PrismaClient();

async function handler(req: Request, { params }: { params: { id: string } }) {
  if (req.method === "DELETE") {
    try {
      const session = await auth();

      if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      }
      const { id: id_todo } = params;

      if (!id_todo) {
        return NextResponse.json(
          {
            message: "Failed to Update a Todo ! id_todo cannot be null",
          },
          { status: 400 }
        );
      }

      if (!session.user?.id) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }
      const id_user: string = session.user?.id;
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

      const todo = await prisma.todo.delete({
        where: { id_todo: old_todo.id_todo },
      });

      if (!todo) {
        return NextResponse.json(
          {
            message: "Failed To Delete a Todo !",
          },
          { status: 500 }
        );
      }
      const response = NextResponse.json(
        {
          data: todo,
          message: "Todo Deleted successfully",
        },
        { status: 201 }
      );

      return response;
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { message: "Failed to Delete a todo !" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Not Found !" }, { status: 404 });
  }
}

export { handler as DELETE };
