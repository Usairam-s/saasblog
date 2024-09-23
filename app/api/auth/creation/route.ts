import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";

import { NextResponse } from "next/server";

export async function GET() {
  const user = await requireUser();

  if (!user || user === null || !user.id) {
    throw new Error("Something went wrong");
  }

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        firstName: user.given_name ?? "",
        lastName: user.family_name ?? "",
        email: user.email ?? "",
        profileImage:
          user.picture ?? `https://avatar.vercel.sh/${user.given_name}`,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "production"
      ? "https://saasblog.vercel.app/dashboard"
      : "http://localhost:3000/dashboard"
  );
}
