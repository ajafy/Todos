import bcrypt from "bcryptjs";
import prisma from "../../prisma";
import { CreateUser } from "../../Types";
import { NextResponse } from "next/server";

async function handler(req: Request) {
  if (
    req.method === "POST" &&
    req.url &&
    req.url.endsWith("/api/auth/register")
  ) {
    try {
      const { fullname, username, gender, email, password }: CreateUser =
        await req.json();

      if (!username || !password || !email || !gender)
        return NextResponse.json(
          {
            message:
              "Failed to Create a User ! Username, password, email or gender cannot be null",
          },
          { status: 400 }
        );
      if (gender != "MALE" && gender != "FEMALE")
        return NextResponse.json(
          {
            message:
              "Failed to Create a User ! Gender must be MALE or FEMALE !",
          },
          { status: 400 }
        );

      const hashedPassword = await bcrypt.hash(password, 10);

      const existUsername = await prisma.user.findFirst({
        where: { username: username },
      });
      const existEmail = await prisma.user.findFirst({
        where: { email: email },
      });
      if (existUsername) {
        return NextResponse.json(
          {
            message: "Username Already in use !",
          },
          { status: 200 }
        );
      }
      if (existEmail) {
        return NextResponse.json(
          {
            message: "Email Already in use !",
          },
          { status: 200 }
        );
      }
      const user = await prisma.user.create({
        data: {
          fullname: fullname,
          username: username,
          gender: gender,
          email: email,
          password: hashedPassword,
        },
      });

      const response = NextResponse.json(
        {
          data: user,
          message: "User created successfully",
        },
        { status: 201 }
      );

      return response;
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to create a user !" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: "Not Found !" }, { status: 404 });
  }
}

export { handler as GET, handler as POST };
