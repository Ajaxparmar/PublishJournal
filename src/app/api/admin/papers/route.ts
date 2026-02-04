// app/api/admin/papers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const papers = await prisma.paper.findMany({
      include: {
        volume: {
          select: {
            id: true,
            name: true,
            years: true,
          },
        },
        issue: {
          select: {
            id: true,
            issueNumber: true,
            period: true,
          },
        },
        authors: {
          select: {
            fullName: true,
            organization: true,
            country: true,
            email: true,
          },
        },
        uploadedBy: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: papers });
  } catch (error) {
    console.error("GET /admin/papers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      title,
      Abstract,
      keywords,
      pdfUrl,
      volumeId,
      issueId,
      isVisible = true,
    } = body;

    // Required fields validation
    if (!title || !pdfUrl || !volumeId) {
      return NextResponse.json(
        { success: false, error: "Title, PDF URL, and Volume ID are required" },
        { status: 400 }
      );
    }

    // Check if volume exists
    const volumeExists = await prisma.volume.findUnique({
      where: { id: volumeId },
    });
    if (!volumeExists) {
      return NextResponse.json(
        { success: false, error: "Invalid volume ID" },
        { status: 400 }
      );
    }

    // If issueId provided, validate it belongs to the volume
    if (issueId) {
      const issueExists = await prisma.issue.findFirst({
        where: {
          id: issueId,
          volumeId,
        },
      });
      if (!issueExists) {
        return NextResponse.json(
          { success: false, error: "Issue does not belong to selected volume" },
          { status: 400 }
        );
      }
    }

    const newPaper = await prisma.paper.create({
      data: {
        title,
        Abstract: Abstract || null,
        keywords: Array.isArray(keywords) ? keywords : [],
        pdfUrl,
        volumeId,
        issueId: issueId || null,
        isVisible,
      },
      include: {
        volume: { select: { name: true, years: true } },
        issue: { select: { issueNumber: true, period: true } },
      },
    });

    return NextResponse.json({ success: true, data: newPaper }, { status: 201 });
  } catch (error) {
    console.error("POST /admin/papers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create paper" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      Abstract,
      keywords,
      pdfUrl,
      volumeId,
      issueId,
      isVisible,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Paper ID is required" },
        { status: 400 }
      );
    }

    // Optional: validate volume if changed
    if (volumeId) {
      const volumeExists = await prisma.volume.findUnique({
        where: { id: volumeId },
      });
      if (!volumeExists) {
        return NextResponse.json(
          { success: false, error: "Invalid volume ID" },
          { status: 400 }
        );
      }
    }

    // If issueId provided and not null, validate it belongs to volume
    if (issueId) {
      const issue = await prisma.issue.findFirst({
        where: {
          id: issueId,
          volumeId: volumeId || undefined, // if volumeId not changing, skip
        },
      });
      if (!issue) {
        return NextResponse.json(
          { success: false, error: "Issue does not belong to selected volume" },
          { status: 400 }
        );
      }
    }

    const updatedPaper = await prisma.paper.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        Abstract: Abstract !== undefined ? Abstract : undefined,
        keywords: Array.isArray(keywords)
          ? keywords
          : keywords !== undefined
          ? keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
          : undefined,
        pdfUrl: pdfUrl !== undefined ? pdfUrl : undefined,
        volumeId: volumeId !== undefined ? volumeId : undefined,
        issueId: issueId !== undefined ? (issueId || null) : undefined,
        isVisible: typeof isVisible === "boolean" ? isVisible : undefined,
      },
      include: {
        volume: { select: { name: true, years: true } },
        issue: { select: { issueNumber: true, period: true } },
      },
    });

    return NextResponse.json({ success: true, data: updatedPaper });
  } catch (error) {
    console.error("PATCH /admin/papers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update paper" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Paper ID is required" },
        { status: 400 }
      );
    }

    await prisma.paper.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Paper deleted" });
  } catch (error) {
    console.error("DELETE /admin/papers error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete paper" },
      { status: 500 }
    );
  }
}