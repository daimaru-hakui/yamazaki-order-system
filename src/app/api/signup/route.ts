import { db } from "@/db";
import { User } from "firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body: User = await req.json();
  await db.user.create({
    data: {
      id: body.uid,
      email: body.email || "",
    },
  });
  return NextResponse.json({ status: "201" });
}
