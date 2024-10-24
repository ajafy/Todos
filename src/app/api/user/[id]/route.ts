// /app/api/user/[id]/route.ts

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

  const { id } = params;

  if (session.user?.id !== id) {
    return NextResponse.json({ message: "Forbiddendddd" }, { status: 403 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id_user: id },
    });

    if (!user) {
      return NextResponse.json({ message: "No such User !" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
