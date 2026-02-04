// app/api/admin/issues/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const issues = await prisma.issue.findMany({
      include: {
        volume: { select: { name: true, years: true } },
        _count: { select: { papers: true } },
      },
      orderBy: [
        { volume: { years: "desc" } },
        { issueNumber: "asc" },
      ],
    });

    return NextResponse.json({ success: true, data: issues });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch issues" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { volumeId, issueNumber, year, period, description } = body;

    if (!volumeId || !issueNumber) {
      return NextResponse.json({ success: false, error: "Volume ID and Issue Number required" }, { status: 400 });
    }

    // Check if issue already exists in this volume
    const existing = await prisma.issue.findFirst({
      where: { volumeId, issueNumber },
    });

    if (existing) {
      return NextResponse.json({ success: false, error: "Issue number already exists in this volume" }, { status: 409 });
    }

    const issue = await prisma.issue.create({
      data: {
        volumeId,
        issueNumber,
        year: year ? Number(year) : null,
        period,
        description,
        isVisible: true,
      },
      include: { volume: { select: { name: true } } },
    });

    return NextResponse.json({ success: true, data: issue }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create issue" }, { status: 500 });
  }
}

// PATCH - Update issue
export async function PATCH(request: NextRequest) {
    try {
      const body = await request.json();
      const { id, issueNumber, year, period, description, isVisible } = body;
  
      if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
  
      const updated = await prisma.issue.update({
        where: { id },
        data: {
          issueNumber,
          year: year ? Number(year) : undefined,
          period,
          description,
          isVisible: typeof isVisible === "boolean" ? isVisible : undefined,
        },
      });
  
      return NextResponse.json({ success: true, data: updated });
    } catch (err) {
      return NextResponse.json({ success: false, error: "Failed to update issue" }, { status: 500 });
    }
  }
  
  // DELETE - Delete issue
  export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
  
    if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
  
    try {
      // Optional: prevent delete if has papers
      const issue = await prisma.issue.findUnique({
        where: { id },
        include: { _count: { select: { papers: true } } },
      });
  
      if (!issue) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  
      if (issue._count.papers > 0) {
        return NextResponse.json(
          { success: false, error: "Cannot delete issue with papers" },
          { status: 409 }
        );
      }
  
      await prisma.issue.delete({ where: { id } });
      return NextResponse.json({ success: true });
    } catch (err) {
      return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
    }
  }