import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, pin } = body;

  if (!pin || pin.length !== 4) {
    return NextResponse.json(
      { error: "4-digit PIN required" },
      { status: 400 }
    );
  }

  const family = await prisma.family.create({
    data: { name: name || "My Family", pin },
  });

  return NextResponse.json({ family });
}

export async function GET(request: NextRequest) {
  const pin = request.nextUrl.searchParams.get("pin");
  if (!pin) {
    return NextResponse.json({ error: "PIN required" }, { status: 400 });
  }

  const family = await prisma.family.findFirst({
    where: { pin },
    include: { progress: true },
  });

  if (!family) {
    return NextResponse.json({ error: "Family not found" }, { status: 404 });
  }

  return NextResponse.json({ family });
}
