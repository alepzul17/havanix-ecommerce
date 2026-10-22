import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();

    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json(
        { message: "Data yang dihantar tak sah." },
        { status: 400 },
      );
    }

    const { fullname, email, password } = body as Record<string, unknown>;

    if (
      typeof fullname !== "string" ||
      !fullname.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof password !== "string" ||
      password.length < 8
    ) {
      return NextResponse.json(
        {
          message:
            "Please enter a valid name, email, and password of at least 8 characters.",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already used" },
        { status: 409 },
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        cart: {
          create: {},
        },
      },
    });

    return NextResponse.json(
      {
        message: "Registration successful!",
        user: {
          id: newUser.id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      {
        message: "Registration Failed.",
      },
      { status: 500 },
    );
  }
}
