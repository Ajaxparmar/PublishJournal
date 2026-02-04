// app/api/papers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { uploadFileToS3 } from "@/lib/s3client"; // your S3/local upload logic
import bcrypt from "bcryptjs";

export const runtime = "nodejs";

const SALT_ROUNDS = 12;
const DEFAULT_PASSWORD = "paper1234"; // ← MUST CHANGE IN PRODUCTION!

// Helper response functions (assuming you have these in "@/lib/api-response")
function success(message: string, data?: unknown, status = 200) {
  return NextResponse.json({ success: true, message, data }, { status });
}

function badRequest(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 400 });
}

function notFound(message: string) {
  return NextResponse.json({ success: false, error: message }, { status: 404 });
}

function serverError(message: string, details?: string) {
  console.error(`Server error: ${message}`, details);
  return NextResponse.json(
    { success: false, error: message, ...(details && { details }) },
    { status: 500 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // ── Log all incoming form data for debugging ────────────────────────
    console.log("=== PAPER SUBMISSION FORM DATA ===");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(
          `${key}: [File] ${value.name} (${value.size} bytes, ${value.type})`
        );
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    console.log("==================================");

    // Extract fields
    const title = formData.get("title")?.toString()?.trim();
    const volumeId = "69807e932eefd3885915731e"
    const keywordsRaw = formData.get("keywords")?.toString()?.trim() || null;
    const authorsJson = formData.get("authors")?.toString()?.trim() || null;
    const pdfFile = formData.get("pdf") as File | null;

    // ── Required fields validation ──────────────────────────────────────
    if (!title) return badRequest("Title is required");
    if (!volumeId) return badRequest("Volume ID is required");
    if (!pdfFile) return badRequest("PDF file is required");
    if (!authorsJson) return badRequest("Authors data is required");

    // ── Validate volumeId format (MongoDB ObjectId = 24 hex chars) ──────
    const objectIdRegex = /^[0-9a-fA-F]{24}$/;
    if (!objectIdRegex.test(volumeId)) {
      console.error(`Invalid volumeId format: "${volumeId}"`);
      return badRequest(
        "Invalid volume ID format — must be a valid 24-character hexadecimal ObjectId"
      );
    }

    // ── Validate PDF file ───────────────────────────────────────────────
    if (pdfFile.type !== "application/pdf") {
      return badRequest("Only PDF files are allowed");
    }
    if (pdfFile.size > 20 * 1024 * 1024) { // 20MB
      return badRequest("PDF file size exceeds 20MB limit");
    }

    // ── Upload PDF to S3 (or local) ─────────────────────────────────────
    const { url: pdfUrl } = await uploadFileToS3(pdfFile, "papers");

    // ── Parse keywords ──────────────────────────────────────────────────
    let keywords: string[] = [];
    if (keywordsRaw) {
      keywords = keywordsRaw
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
    }

    // ── Parse authors (expecting array of objects) ──────────────────────
    let authorsData: Array<{
      fullName: string;
      organization: string;
      country: string;
      email: string;
    }> = [];
    try {
      authorsData = JSON.parse(authorsJson);
      if (!Array.isArray(authorsData) || authorsData.length === 0) {
        throw new Error("Authors must be a non-empty array");
      }
    } catch (err) {
      return badRequest("Invalid authors JSON format");
    }

    // ── Verify volume exists ────────────────────────────────────────────
    const volume = await prisma.volume.findUnique({
      where: { id: volumeId },
    });

    if (!volume) {
      return notFound(`Volume with ID ${volumeId} not found`);
    }

    // ── Handle user (based on first author's email) ─────────────────────
    const mainAuthor = authorsData[0];
    let uploadedById: string | undefined = undefined;

    if (mainAuthor?.email) {
      const email = mainAuthor.email.trim().toLowerCase();

      let user = await prisma.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (!user) {
        const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, SALT_ROUNDS);

        user = await prisma.user.create({
          data: {
            email,
            username: email.split("@")[0] || `user_${Date.now()}`,
            password: hashedPassword,
            role: "USER",
          },
          select: { id: true },
        });
      }

      uploadedById = user.id;
    }

    // ── Create the Paper record ─────────────────────────────────────────
    const newPaper = await prisma.paper.create({
      data: {
        title,
        keywords,
        pdfUrl,
        volume: { connect: { id: volumeId } },
        ...(uploadedById && { uploadedBy: { connect: { id: uploadedById } } }),
      },
      include: {
        volume: true,
        ...(uploadedById && {
          uploadedBy: { select: { id: true, username: true, email: true } },
        }),
      },
    });

    // ── Create Author records ───────────────────────────────────────────
    await Promise.all(
      authorsData.map(async (author) => {
        await prisma.author.create({
          data: {
            fullName: author.fullName.trim(),
            organization: author.organization.trim(),
            country: author.country.trim(),
            email: author.email.trim(),
            paper: { connect: { id: newPaper.id } },
          },
        });
      })
    );

    // ── Fetch complete paper with authors ───────────────────────────────
    const paperWithAuthors = await prisma.paper.findUnique({
      where: { id: newPaper.id },
      include: {
        volume: true,
        authors: true,
        ...(uploadedById && {
          uploadedBy: { select: { id: true, username: true, email: true } },
        }),
      },
    });

    return success("Paper submitted successfully", paperWithAuthors, 201);
  } catch (error: unknown) {
    const errMsg =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error submitting paper:", error);
    return serverError("Failed to submit paper", errMsg);
  }
}


;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const issueId = searchParams.get('issueId')?.trim();
    const papers = await prisma.paper.findMany({
      where: {
        ...(issueId ? { issueId } : {}),
        isVisible: true,
      },
      include: {
        authors: {
          select: {
            id: true,
            fullName: true,
            organization: true,
            country: true,
            email: true,
          },
          orderBy: { createdAt: 'asc' }, // or by fullName if you prefer
        },
        // Optional: include volume & issue info (very useful for current issue page)
        volume: {
          select: {
            id: true,
            name: true,        // "Volume 21"
            years: true,
            description: true,
          },
        },
        issue: {
          select: {
            id: true,
            issueNumber: true,
            year: true,
            period: true,
            description: true,
          },
        },
      },
      orderBy: [
        // Most common ordering for journal display
        { createdAt: 'desc' },          // newest first
        // Alternative: order by title or custom order field if you add one later
        // { title: 'asc' },
      ],
      // Optional: pagination support (add later if needed)
      // take: 20,
      // skip: page * 20,
    });

    // Optional: enrich data if needed (e.g. compute full DOI, format dates, etc.)
    const enrichedPapers = papers.map((paper: { volume: { name: string; }; issue: { issueNumber: unknown; }; id: string | unknown[]; }) => ({
      ...paper,
      // Example: generate a simple display DOI if you don't store it
      displayDoi: paper.volume && paper.issue
        ? `10.18848/2324-7649/CGP/v${paper.volume.name.replace('Volume ', '')}i0${paper.issue.issueNumber}/${paper.id.slice(0,8)}`
        : null,
      // publishedDate: new Date(paper.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    }));

    return NextResponse.json({
      success: true,
      data: enrichedPapers,
      meta: {
        count: papers.length,
        issueId: issueId || null,
        timestamp: new Date().toISOString(),
      },
    }, { status: 200 });

  } catch (err: unknown) {
    console.error('[API /papers GET] Error:', err);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch papers',
        details: process.env.NODE_ENV === 'development' ? err : undefined,
      },
      { status: 500 }
    );
  }
}