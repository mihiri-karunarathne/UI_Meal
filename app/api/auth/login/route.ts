import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, password, role } = await req.json();

  // 🔐 TEMP: Replace with DB later
  if (userId === "doctor" && password === "123") {
    return NextResponse.json({ role: "doctor" });
  }

  if (userId === "nurse" && password === "123") {
    return NextResponse.json({ role: "nurse" });
  }

  if (userId === "admin" && password === "123") {
    return NextResponse.json({ role: "admin" });
  }

  return NextResponse.json(
    { message: "Invalid User ID or Password" },
    { status: 401 }
  );
}