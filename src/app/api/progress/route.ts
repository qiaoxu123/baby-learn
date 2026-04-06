import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
  const familyId = request.nextUrl.searchParams.get("familyId");
  if (!familyId) {
    return NextResponse.json({ error: "familyId required" }, { status: 400 });
  }

  const progress = await prisma.progress.findMany({
    where: { familyId },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ progress });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { familyId, module, lessonId, stars, completed } = body;

  if (!familyId || !module || !lessonId) {
    return NextResponse.json(
      { error: "familyId, module, and lessonId required" },
      { status: 400 }
    );
  }

  const progress = await prisma.progress.upsert({
    where: {
      familyId_module_lessonId: { familyId, module, lessonId },
    },
    update: {
      stars: stars ?? undefined,
      completed: completed ?? undefined,
    },
    create: {
      familyId,
      module,
      lessonId,
      stars: stars ?? 0,
      completed: completed ?? false,
    },
  });

  return NextResponse.json({ progress });
}
