// app/api/admin/issues/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// Directory where uploaded issue cover images will be saved
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/issues");

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
    console.error("GET /admin/issues error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch issues" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const volumeId = formData.get("volumeId") as string;
    const issueNumber = formData.get("issueNumber") as string;
    const yearStr = formData.get("year") as string | null;
    const period = formData.get("period") as string | null;
    const description = formData.get("description") as string | null;
    const imageFile = formData.get("image") as File | null;

    // Required fields validation
    if (!volumeId || !issueNumber) {
      return NextResponse.json(
        { success: false, error: "Volume ID and Issue Number are required" },
        { status: 400 }
      );
    }

    // Check if issue number already exists in this volume
    const existing = await prisma.issue.findFirst({
      where: { volumeId, issueNumber },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: "Issue number already exists in this volume" },
        { status: 409 }
      );
    }

    // Validate volume exists
    const volume = await prisma.volume.findUnique({
      where: { id: volumeId },
    });

    if (!volume) {
      return NextResponse.json(
        { success: false, error: "Invalid volume ID" },
        { status: 400 }
      );
    }

    // Handle image upload (optional)
    let imageUrl: string | null = null;

    if (imageFile && imageFile.size > 0) {
      // Ensure upload directory exists
      await fs.mkdir(UPLOAD_DIR, { recursive: true });

      const ext = path.extname(imageFile.name) || ".jpg";
      const filename = `${uuidv4()}${ext}`;
      const filePath = path.join(UPLOAD_DIR, filename);

      // Save file to disk
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      // Public URL (accessible via /uploads/issues/filename.jpg)
      imageUrl = `/uploads/issues/${filename}`;
    }

    // Create issue
    const issue = await prisma.issue.create({
      data: {
        volumeId,
        issueNumber,
        year: yearStr ? Number(yearStr) : null,
        period,
        description,
        imageUrl,
        isVisible: true,
      },
      include: {
        volume: { select: { name: true, years: true } },
      },
    });

    return NextResponse.json({ success: true, data: issue }, { status: 201 });
  } catch (error) {
    console.error("POST /admin/issues error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create issue" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();

    const id = formData.get("id") as string;
    const issueNumber = formData.get("issueNumber") as string | null;
    const yearStr = formData.get("year") as string | null;
    const period = formData.get("period") as string | null;
    const description = formData.get("description") as string | null;
    const imageFile = formData.get("image") as File | null;
    const imageUrlClear = formData.get("imageUrl") as string | null; // "null" to clear
    const isVisibleStr = formData.get("isVisible") as string | null;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Issue ID required" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {};

    if (issueNumber !== null) updateData.issueNumber = issueNumber;
    if (yearStr !== null) updateData.year = yearStr ? Number(yearStr) : null;
    if (period !== null) updateData.period = period;
    if (description !== null) updateData.description = description;
    if (isVisibleStr !== null) updateData.isVisible = isVisibleStr === "true";

    // Image handling
    let imageUrl: string | null | undefined;

    if (imageFile && imageFile.size > 0) {
      // New file uploaded → save it
      await fs.mkdir(UPLOAD_DIR, { recursive: true });

      const ext = path.extname(imageFile.name) || ".jpg";
      const filename = `${uuidv4()}${ext}`;
      const filePath = path.join(UPLOAD_DIR, filename);

      const buffer = Buffer.from(await imageFile.arrayBuffer());
      await fs.writeFile(filePath, buffer);

      imageUrl = `/uploads/issues/${filename}`;
      updateData.imageUrl = imageUrl;
    } else if (imageUrlClear === "null") {
      // Explicitly clear image
      updateData.imageUrl = null;
    }
    // If neither → do NOT touch imageUrl field → keep existing

    const updated = await prisma.issue.update({
      where: { id },
      data: updateData,
      include: {
        volume: { select: { name: true, years: true } },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /admin/issues error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update issue" },
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
        { success: false, error: "Issue ID required" },
        { status: 400 }
      );
    }

    const issue = await prisma.issue.findUnique({
      where: { id },
      include: { _count: { select: { papers: true } } },
    });

    if (!issue) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    if (issue._count.papers > 0) {
      return NextResponse.json(
        { success: false, error: "Cannot delete issue with papers" },
        { status: 409 }
      );
    }

    await prisma.issue.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Issue deleted successfully" });
  } catch (error) {
    console.error("DELETE /admin/issues error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete issue" },
      { status: 500 }
    );
  }
}