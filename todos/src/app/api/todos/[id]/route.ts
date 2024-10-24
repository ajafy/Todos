import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "auth";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id: id_user } = params;

  if (session.user?.id !== id_user) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: { id_user },
    });

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
