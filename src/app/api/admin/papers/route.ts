import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth"; // adjust if using different auth
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // uncomment & adjust

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/papers");

async function deleteFileIfExists(filePath: string) {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch {
    // file doesn't exist or can't be deleted → silent fail
  }
}

export async function GET() {
  try {
    const papers = await prisma.paper.findMany({
      include: {
        volume: { select: { id: true, name: true, years: true } },
        issue: { select: { id: true, issueNumber: true, period: true } },
        authors: {
          select: { fullName: true, organization: true, country: true, email: true },
        },
        uploadedBy: { select: { id: true, username: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: papers });
  } catch (error) {
    console.error("GET /admin/papers error:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch papers" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(); // adjust according to your auth setup
    if (!session?.user || !("id" in session.user)) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const title = formData.get("title") as string;
    const abstract = formData.get("abstract") as string | null;
    const keywordsStr = formData.get("keywords") as string | null;
    const volumeId = formData.get("volumeId") as string;
    const issueId = formData.get("issueId") as string | null;
    const pdfFile = formData.get("pdf") as File | null;
    const imageFile = formData.get("image") as File | null;

    if (!title || !pdfFile || !volumeId) {
      return NextResponse.json(
        { success: false, error: "Title, PDF file, and Volume ID required" },
        { status: 400 }
      );
    }

    const volume = await prisma.volume.findUnique({ where: { id: volumeId } });
    if (!volume) {
      return NextResponse.json({ success: false, error: "Invalid volume ID" }, { status: 400 });
    }

    if (issueId) {
      const issue = await prisma.issue.findFirst({ where: { id: issueId, volumeId } });
      if (!issue) {
        return NextResponse.json(
          { success: false, error: "Issue does not belong to selected volume" },
          { status: 400 }
        );
      }
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const pdfExt = path.extname(pdfFile.name) || ".pdf";
    const pdfFilename = `${uuidv4()}${pdfExt}`;
    const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
    await fs.writeFile(pdfPath, Buffer.from(await pdfFile.arrayBuffer()));
    const pdfUrl = `/uploads/papers/${pdfFilename}`;

    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const imgExt = path.extname(imageFile.name) || ".jpg";
      const imgFilename = `${uuidv4()}${imgExt}`;
      const imgPath = path.join(UPLOAD_DIR, imgFilename);
      await fs.writeFile(imgPath, Buffer.from(await imageFile.arrayBuffer()));
      imageUrl = `/uploads/papers/${imgFilename}`;
    }

    const keywords = keywordsStr
      ? keywordsStr.split(",").map(k => k.trim()).filter(Boolean)
      : [];

    const newPaper = await prisma.paper.create({
      data: {
        title,
        Abstract: abstract || null,
        keywords,
        pdfUrl,
        imageUrl,
        volumeId,
        issueId: issueId || null,
        isVisible: true,
        uploadedById: (session.user as { id: string }).id, // Ensure this matches your Prisma schema field
      },
      include: {
        volume: { select: { name: true, years: true } },
        issue: { select: { issueNumber: true, period: true } },
        uploadedBy: { select: { id: true, username: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, data: newPaper }, { status: 201 });
  } catch (error) {
    console.error("POST /admin/papers error:", error);
    return NextResponse.json({ success: false, error: "Failed to create paper" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;
    console.log(`Updating paper with ID: ${formData}`);

    
    if (!id) {
      return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
    }

    // Fetch current paper to compare & clean up files
    const currentPaper = await prisma.paper.findUnique({
      where: { id },
      select: { pdfUrl: true, imageUrl: true, volumeId: true, issueId: true , uploadedById: true,},
    });

    if (!currentPaper) {
      return NextResponse.json({ success: false, error: "Paper not found" }, { status: 404 });
    }
    const updatedByUserId = currentPaper.uploadedById;

    const title = formData.get("title") as string | null;
    const abstract = formData.get("abstract") as string | null;
    const keywordsStr = formData.get("keywords") as string | null;
    const pdfFile = formData.get("pdf") as File | null;
    const imageFile = formData.get("image") as File | null;
    const imageUrlClear = formData.get("imageUrl") as string | null;
    const volumeId = formData.get("volumeId") as string | null;
    const issueId = formData.get("issueId") as string | null;
    const isVisibleStr = formData.get("isVisible") as string | null;
    const status = formData.get("status") as string | null;
    const password = formData.get("newPassword") as string | null;

    const updateData: Record<string, unknown> = {};

    console.log("password",password); // Debug log
    
    if (password && password.trim().length >= 6) {
      const hashedPassword = await bcrypt.hash(password, 10);
    
      await prisma.user.update({
        where: { id: currentPaper.uploadedById ?? undefined },
        data: { password: hashedPassword },
      });
      console.log(`Password updated for user ID: ${updatedByUserId}`); // Debug log
      
    }
    

    if (title) updateData.title = title;
    if (abstract !== null) updateData.Abstract = abstract;
    if (keywordsStr !== null) {
      updateData.keywords = keywordsStr.split(",").map((k: string) => k.trim()).filter(Boolean);
    }
    if (isVisibleStr !== null) updateData.isVisible = isVisibleStr === "true";

    if (status) {
      const validStatuses = ["SUBMITTED", "UNDER_REVIEW", "IN_PROCESS", "ACCEPTED", "PUBLISHED", "REJECTED"];
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
      }
      updateData.status = status;
    }

    // Volume & Issue validation
    const finalVolumeId = volumeId ?? currentPaper.volumeId;
    const finalIssueId = issueId !== null ? issueId : currentPaper.issueId;

    if (finalIssueId) {
      const issue = await prisma.issue.findFirst({
        where: { id: finalIssueId, volumeId: finalVolumeId },
      });
      if (!issue) {
        return NextResponse.json(
          { success: false, error: "Issue must belong to the selected volume" },
          { status: 400 }
        );
      }
      updateData.issue = { connect: { id: finalIssueId } };
    } else if (issueId === "") {
      updateData.issue = { disconnect: true };
    }

    if (volumeId) {
      const vol = await prisma.volume.findUnique({ where: { id: volumeId } });
      if (!vol) return NextResponse.json({ success: false, error: "Invalid volume" }, { status: 400 });
      updateData.volume = { connect: { id: volumeId } };
    }

    // Handle file replacements + cleanup
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    if (pdfFile && pdfFile.size > 0) {
      const pdfExt = path.extname(pdfFile.name) || ".pdf";
      const pdfFilename = `${uuidv4()}${pdfExt}`;
      const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
      await fs.writeFile(pdfPath, Buffer.from(await pdfFile.arrayBuffer()));
      updateData.pdfUrl = `/uploads/papers/${pdfFilename}`;

      // Delete old PDF
      if (currentPaper.pdfUrl) {
        const oldPath = path.join(process.cwd(), "public", currentPaper.pdfUrl);
        await deleteFileIfExists(oldPath);
      }
    }

    if (imageFile && imageFile.size > 0) {
      const imgExt = path.extname(imageFile.name) || ".jpg";
      const imgFilename = `${uuidv4()}${imgExt}`;
      const imgPath = path.join(UPLOAD_DIR, imgFilename);
      await fs.writeFile(imgPath, Buffer.from(await imageFile.arrayBuffer()));
      updateData.imageUrl = `/uploads/papers/${imgFilename}`;

      // Delete old image
      if (currentPaper.imageUrl) {
        const oldPath = path.join(process.cwd(), "public", currentPaper.imageUrl);
        await deleteFileIfExists(oldPath);
      }
    } else if (imageUrlClear === "null" && currentPaper.imageUrl) {
      updateData.imageUrl = null;
      const oldPath = path.join(process.cwd(), "public", currentPaper.imageUrl);
      await deleteFileIfExists(oldPath);
    }

    const updated = await prisma.paper.update({
      where: { id },
      data: updateData,
      include: {
        volume: { select: { name: true, years: true } },
        issue: { select: { issueNumber: true, period: true } },
        uploadedBy: { select: { id: true, username: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /admin/papers error:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Failed to update paper" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
    }

    // Fetch paper to clean up files
    const paper = await prisma.paper.findUnique({
      where: { id },
      select: { pdfUrl: true, imageUrl: true },
    });

    if (!paper) {
      return NextResponse.json({ success: false, error: "Paper not found" }, { status: 404 });
    }

    // Delete files
    if (paper.pdfUrl) {
      const pdfPath = path.join(process.cwd(), "public", paper.pdfUrl);
      await deleteFileIfExists(pdfPath);
    }
    if (paper.imageUrl) {
      const imgPath = path.join(process.cwd(), "public", paper.imageUrl);
      await deleteFileIfExists(imgPath);
    }

    await prisma.paper.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Paper deleted successfully" });
  } catch (error) {
    console.error("DELETE /admin/papers error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete paper" }, { status: 500 });
  }
}