// // import { NextRequest, NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";
// // import path from "path";
// // import fs from "fs/promises";
// // import { v4 as uuidv4 } from "uuid";
// // import bcrypt from "bcryptjs";
// // import { getServerSession } from "next-auth"; // adjust if using different auth
// // // import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // uncomment & adjust

// // const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/papers");

// // async function deleteFileIfExists(filePath: string) {
// //   try {
// //     await fs.access(filePath);
// //     await fs.unlink(filePath);
// //   } catch {
// //     // file doesn't exist or can't be deleted → silent fail
// //   }
// // }

// // export async function GET() {
// //   try {
// //     const papers = await prisma.paper.findMany({
// //       include: {
// //         volume: { select: { id: true, name: true, years: true } },
// //         issue: { select: { id: true, issueNumber: true, period: true } },
// //         authors: {
// //           select: { fullName: true, organization: true, country: true, email: true },
// //         },
// //         uploadedBy: { select: { id: true, username: true, email: true } },
// //       },
// //       orderBy: { createdAt: "desc" },
// //     });

// //     return NextResponse.json({ success: true, data: papers });
// //   } catch (error) {
// //     console.error("GET /admin/papers error:", error);
// //     return NextResponse.json({ success: false, error: "Failed to fetch papers" }, { status: 500 });
// //   }
// // }

// // export async function POST(request: NextRequest) {
// //   try {
// //     const session = await getServerSession(); // adjust according to your auth setup
// //     if (!session?.user || !("id" in session.user)) {
// //       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
// //     }

// //     const formData = await request.formData();

// //     const title = formData.get("title") as string;
// //     const abstract = formData.get("abstract") as string | null;
// //     const keywordsStr = formData.get("keywords") as string | null;

// //     const volumeId = formData.get("volumeId") as string;
// //     const issueId = formData.get("issueId") as string | null;
// //     const pdfFile = formData.get("pdf") as File | null;
// //     const imageFile = formData.get("image") as File | null;

// //     if (!title || !pdfFile || !volumeId) {
// //       return NextResponse.json(
// //         { success: false, error: "Title, PDF file, and Volume ID required" },
// //         { status: 400 }
// //       );
// //     }

// //     const volume = await prisma.volume.findUnique({ where: { id: volumeId } });
// //     if (!volume) {
// //       return NextResponse.json({ success: false, error: "Invalid volume ID" }, { status: 400 });
// //     }

// //     if (issueId) {
// //       const issue = await prisma.issue.findFirst({ where: { id: issueId, volumeId } });
// //       if (!issue) {
// //         return NextResponse.json(
// //           { success: false, error: "Issue does not belong to selected volume" },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     await fs.mkdir(UPLOAD_DIR, { recursive: true });

// //     const pdfExt = path.extname(pdfFile.name) || ".pdf";
// //     const pdfFilename = `${uuidv4()}${pdfExt}`;
// //     const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
// //     await fs.writeFile(pdfPath, Buffer.from(await pdfFile.arrayBuffer()));
// //     const pdfUrl = `/uploads/papers/${pdfFilename}`;

// //     let imageUrl: string | null = null;
// //     if (imageFile && imageFile.size > 0) {
// //       const imgExt = path.extname(imageFile.name) || ".jpg";
// //       const imgFilename = `${uuidv4()}${imgExt}`;
// //       const imgPath = path.join(UPLOAD_DIR, imgFilename);
// //       await fs.writeFile(imgPath, Buffer.from(await imageFile.arrayBuffer()));
// //       imageUrl = `/uploads/papers/${imgFilename}`;
// //     }

// //     const keywords = keywordsStr
// //       ? keywordsStr.split(",").map(k => k.trim()).filter(Boolean)
// //       : [];

// //     const newPaper = await prisma.paper.create({
// //       data: {
// //         title,
// //         Abstract: abstract || null,
// //         keywords,
// //         pdfUrl,
// //         imageUrl,
// //         volumeId,
// //         issueId: issueId || null,
// //         isVisible: true,
// //         uploadedById: (session.user as { id: string }).id, // Ensure this matches your Prisma schema field
// //       },
// //       include: {
// //         volume: { select: { name: true, years: true } },
// //         issue: { select: { issueNumber: true, period: true } },
// //         uploadedBy: { select: { id: true, username: true, email: true } },
// //       },
// //     });

// //     return NextResponse.json({ success: true, data: newPaper }, { status: 201 });
// //   } catch (error) {
// //     console.error("POST /admin/papers error:", error);
// //     return NextResponse.json({ success: false, error: "Failed to create paper" }, { status: 500 });
// //   }
// // }

// // export async function PATCH(request: NextRequest) {
// //   try {
// //     const formData = await request.formData();
// //     const id = formData.get("id") as string;
// //     console.log(`Updating paper with ID: ${formData}`);

    
// //     if (!id) {
// //       return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
// //     }

// //     // Fetch current paper to compare & clean up files
// //     const currentPaper = await prisma.paper.findUnique({
// //       where: { id },
// //       select: { pdfUrl: true, imageUrl: true, volumeId: true, issueId: true , uploadedById: true,},
// //     });

// //     if (!currentPaper) {
// //       return NextResponse.json({ success: false, error: "Paper not found" }, { status: 404 });
// //     }
// //     const updatedByUserId = currentPaper.uploadedById;

// //     const title = formData.get("title") as string | null;
// //     const abstract = formData.get("abstract") as string | null;
// //     const keywordsStr = formData.get("keywords") as string | null;
// //     const otherauthorsStr = formData.get("otherAuthors") as string | null;
// //     const pdfFile = formData.get("pdf") as File | null;
// //     const imageFile = formData.get("image") as File | null;
// //     const imageUrlClear = formData.get("imageUrl") as string | null;
// //     const volumeId = formData.get("volumeId") as string | null;
// //     const issueId = formData.get("issueId") as string | null;
// //     const isVisibleStr = formData.get("isVisible") as string | null;
// //     const status = formData.get("status") as string | null;
// //     const password = formData.get("newPassword") as string | null;

// //     const updateData: Record<string, unknown> = {};

// //     console.log("password",password); // Debug log
    
// //     if (password && password.trim().length >= 6) {
// //       const hashedPassword = await bcrypt.hash(password, 10);
    
// //       await prisma.user.update({
// //         where: { id: currentPaper.uploadedById ?? undefined },
// //         data: { password: hashedPassword },
// //       });
// //       console.log(`Password updated for user ID: ${updatedByUserId}`); // Debug log
      
// //     }
    

// //     if (title) updateData.title = title;
// //     if (abstract !== null) updateData.Abstract = abstract;
// //     if (keywordsStr !== null) {
// //       updateData.keywords = keywordsStr.split(",").map((k: string) => k.trim()).filter(Boolean);
// //     }
// //     if (otherauthorsStr !== null) {
// //       updateData.otherAuthors = otherauthorsStr.split(",").map((k: string) => k.trim()).filter(Boolean);
// //     }
// //     if (isVisibleStr !== null) updateData.isVisible = isVisibleStr === "true";

// //     if (status) {
// //       const validStatuses = ["SUBMITTED", "UNDER_REVIEW", "IN_PROCESS", "ACCEPTED", "PUBLISHED", "REJECTED"];
// //       if (!validStatuses.includes(status)) {
// //         return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
// //       }
// //       updateData.status = status;
// //     }

// //     // Volume & Issue validation
// //     const finalVolumeId = volumeId ?? currentPaper.volumeId;
// //     const finalIssueId = issueId !== null ? issueId : currentPaper.issueId;

// //     if (finalIssueId) {
// //       const issue = await prisma.issue.findFirst({
// //         where: { id: finalIssueId, volumeId: finalVolumeId },
// //       });
// //       if (!issue) {
// //         return NextResponse.json(
// //           { success: false, error: "Issue must belong to the selected volume" },
// //           { status: 400 }
// //         );
// //       }
// //       updateData.issue = { connect: { id: finalIssueId } };
// //     } else if (issueId === "") {
// //       updateData.issue = { disconnect: true };
// //     }

// //     if (volumeId) {
// //       const vol = await prisma.volume.findUnique({ where: { id: volumeId } });
// //       if (!vol) return NextResponse.json({ success: false, error: "Invalid volume" }, { status: 400 });
// //       updateData.volume = { connect: { id: volumeId } };
// //     }

// //     // Handle file replacements + cleanup
// //     await fs.mkdir(UPLOAD_DIR, { recursive: true });

// //     if (pdfFile && pdfFile.size > 0) {
// //       const pdfExt = path.extname(pdfFile.name) || ".pdf";
// //       const pdfFilename = `${uuidv4()}${pdfExt}`;
// //       const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
// //       await fs.writeFile(pdfPath, Buffer.from(await pdfFile.arrayBuffer()));
// //       updateData.pdfUrl = `/uploads/papers/${pdfFilename}`;

// //       // Delete old PDF
// //       if (currentPaper.pdfUrl) {
// //         const oldPath = path.join(process.cwd(), "public", currentPaper.pdfUrl);
// //         await deleteFileIfExists(oldPath);
// //       }
// //     }

// //     if (imageFile && imageFile.size > 0) {
// //       const imgExt = path.extname(imageFile.name) || ".jpg";
// //       const imgFilename = `${uuidv4()}${imgExt}`;
// //       const imgPath = path.join(UPLOAD_DIR, imgFilename);
// //       await fs.writeFile(imgPath, Buffer.from(await imageFile.arrayBuffer()));
// //       updateData.imageUrl = `/uploads/papers/${imgFilename}`;

// //       // Delete old image
// //       if (currentPaper.imageUrl) {
// //         const oldPath = path.join(process.cwd(), "public", currentPaper.imageUrl);
// //         await deleteFileIfExists(oldPath);
// //       }
// //     } else if (imageUrlClear === "null" && currentPaper.imageUrl) {
// //       updateData.imageUrl = null;
// //       const oldPath = path.join(process.cwd(), "public", currentPaper.imageUrl);
// //       await deleteFileIfExists(oldPath);
// //     }

// //     const updated = await prisma.paper.update({
// //       where: { id },
// //       data: updateData,
// //       include: {
// //         volume: { select: { name: true, years: true } },
// //         issue: { select: { issueNumber: true, period: true } },
// //         uploadedBy: { select: { id: true, username: true, email: true } },
// //       },
// //     });

// //     return NextResponse.json({ success: true, data: updated });
// //   } catch (error) {
// //     console.error("PATCH /admin/papers error:", error);
// //     return NextResponse.json(
// //       { success: false, error: error instanceof Error ? error.message : "Failed to update paper" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function DELETE(request: NextRequest) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const id = searchParams.get("id");

// //     if (!id) {
// //       return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
// //     }

// //     // Fetch paper to clean up files
// //     const paper = await prisma.paper.findUnique({
// //       where: { id },
// //       select: { pdfUrl: true, imageUrl: true },
// //     });

// //     if (!paper) {
// //       return NextResponse.json({ success: false, error: "Paper not found" }, { status: 404 });
// //     }

// //     // Delete files
// //     if (paper.pdfUrl) {
// //       const pdfPath = path.join(process.cwd(), "public", paper.pdfUrl);
// //       await deleteFileIfExists(pdfPath);
// //     }
// //     if (paper.imageUrl) {
// //       const imgPath = path.join(process.cwd(), "public", paper.imageUrl);
// //       await deleteFileIfExists(imgPath);
// //     }

// //     await prisma.paper.delete({ where: { id } });

// //     return NextResponse.json({ success: true, message: "Paper deleted successfully" });
// //   } catch (error) {
// //     console.error("DELETE /admin/papers error:", error);
// //     return NextResponse.json({ success: false, error: "Failed to delete paper" }, { status: 500 });
// //   }
// // }


// // src/app/api/admin/papers/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import path from "path";
// import fs from "fs/promises";
// import { v4 as uuidv4 } from "uuid";
// import bcrypt from "bcryptjs";
// import { getServerSession } from "next-auth";

// const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/papers");

// async function deleteFileIfExists(filePath: string) {
//   try {
//     await fs.access(filePath);
//     await fs.unlink(filePath);
//   } catch {
//     // File doesn't exist or can't be deleted → silent fail
//   }
// }

// export async function GET() {
//   try {
//     const papers = await prisma.paper.findMany({
//       include: {
//         volume: { select: { id: true, name: true, years: true } },
//         issue: { select: { id: true, issueNumber: true, period: true } },
//         authors: {
//           select: { fullName: true, organization: true, country: true, email: true },
//         },
//         uploadedBy: { select: { id: true, username: true, email: true } },
//       },
//       orderBy: { createdAt: "desc" },
//     });

//     return NextResponse.json({ success: true, data: papers });
//   } catch (error) {
//     console.error("GET /admin/papers error:", error);
//     return NextResponse.json({ success: false, error: "Failed to fetch papers" }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const session = await getServerSession();
//     if (!session?.user || !("id" in session.user)) {
//       return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
//     }

//     const formData = await request.formData();

//     const title = formData.get("title") as string;
//     const abstract = formData.get("abstract") as string | null;
//     const keywordsStr = formData.get("keywords") as string | null;
//     const otherAuthorsStr = formData.get("otherAuthors") as string | null; // ← new field
//     const volumeId = formData.get("volumeId") as string;
//     const issueId = formData.get("issueId") as string | null;
//     const pdfFile = formData.get("pdf") as File | null;
//     const imageFile = formData.get("image") as File | null;

//     if (!title || !pdfFile || !volumeId) {
//       return NextResponse.json(
//         { success: false, error: "Title, PDF file, and Volume ID are required" },
//         { status: 400 }
//       );
//     }

//     // Validate volume exists
//     const volume = await prisma.volume.findUnique({ where: { id: volumeId } });
//     if (!volume) {
//       return NextResponse.json({ success: false, error: "Invalid volume ID" }, { status: 400 });
//     }

//     // Validate issue belongs to volume (if provided)
//     if (issueId) {
//       const issue = await prisma.issue.findFirst({
//         where: { id: issueId, volumeId },
//       });
//       if (!issue) {
//         return NextResponse.json(
//           { success: false, error: "Issue does not belong to selected volume" },
//           { status: 400 }
//         );
//       }
//     }

//     await fs.mkdir(UPLOAD_DIR, { recursive: true });

//     // Upload PDF
//     const pdfExt = path.extname(pdfFile.name) || ".pdf";
//     const pdfFilename = `${uuidv4()}${pdfExt}`;
//     const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
//     await fs.writeFile(pdfPath, Buffer.from(await pdfFile.arrayBuffer()));
//     const pdfUrl = `/uploads/papers/${pdfFilename}`;

//     // Upload optional image
//     let imageUrl: string | null = null;
//     if (imageFile && imageFile.size > 0) {
//       const imgExt = path.extname(imageFile.name) || ".jpg";
//       const imgFilename = `${uuidv4()}${imgExt}`;
//       const imgPath = path.join(UPLOAD_DIR, imgFilename);
//       await fs.writeFile(imgPath, Buffer.from(await imageFile.arrayBuffer()));
//       imageUrl = `/uploads/papers/${imgFilename}`;
//     }

//     // Parse keywords & other authors
//     const keywords = keywordsStr
//       ? keywordsStr.split(",").map(k => k.trim()).filter(Boolean)
//       : [];

//     const otherAuthors = otherAuthorsStr
//       ? otherAuthorsStr.split(",").map(a => a.trim()).filter(Boolean)
//       : [];

//     const newPaper = await prisma.paper.create({
//       data: {
//         title,
//         Abstract: abstract || null,
//         keywords,
//         otherAuthors,                 // ← saved as string[]
//         pdfUrl,
//         imageUrl,
//         volumeId,
//         issueId: issueId || null,
//         isVisible: true,
//         uploadedById: (session.user as { id: string }).id,
//       },
//       include: {
//         volume: { select: { name: true, years: true } },
//         issue: { select: { issueNumber: true, period: true } },
//         uploadedBy: { select: { id: true, username: true, email: true } },
//       },
//     });

//     return NextResponse.json({ success: true, data: newPaper }, { status: 201 });
//   } catch (error) {
//     console.error("POST /admin/papers error:", error);
//     return NextResponse.json({ success: false, error: "Failed to create paper" }, { status: 500 });
//   }
// }

// export async function PATCH(request: NextRequest) {
//   try {
//     const formData = await request.formData();
//     const id = formData.get("id") as string;

//     if (!id) {
//       return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
//     }

//     console.log(`PATCH /admin/papers - Updating paper ID: ${id}`);

//     // Fetch current paper (for file cleanup & ownership check)
//     const currentPaper = await prisma.paper.findUnique({
//       where: { id },
//       select: {
//         pdfUrl: true,
//         imageUrl: true,
//         volumeId: true,
//         issueId: true,
//         uploadedById: true,
//       },
//     });

//     if (!currentPaper) {
//       return NextResponse.json({ success: false, error: "Paper not found" }, { status: 404 });
//     }

//     const formTitle = formData.get("title") as string | null;
//     const formAbstract = formData.get("abstract") as string | null;
//     const formKeywords = formData.get("keywords") as string | null;
//     const formOtherAuthors = formData.get("otherAuthors") as string | null; // ← fixed field name
//     const formPdf = formData.get("pdf") as File | null;
//     const formImage = formData.get("image") as File | null;
//     const formImageClear = formData.get("imageUrl") as string | null; // "null" to clear
//     const formVolumeId = formData.get("volumeId") as string | null;
//     const formIssueId = formData.get("issueId") as string | null;
//     const formIsVisible = formData.get("isVisible") as string | null;
//     const formStatus = formData.get("status") as string | null;
//     const formPassword = formData.get("newPassword") as string | null;

//     const updateData: Record<string, unknown> = {};

//     // Handle password update for uploadedBy user
//     if (formPassword && formPassword.trim().length >= 6 && currentPaper.uploadedById) {
//       const hashedPassword = await bcrypt.hash(formPassword, 10);
//       await prisma.user.update({
//         where: { id: currentPaper.uploadedById },
//         data: { password: hashedPassword },
//       });
//       console.log(`Password updated for user ID: ${currentPaper.uploadedById}`);
//     }

//     // Basic fields
//     if (formTitle) updateData.title = formTitle;
//     if (formAbstract !== null) updateData.Abstract = formAbstract;

//     if (formKeywords !== null) {
//       updateData.keywords = formKeywords
//         .split(",")
//         .map((k: string) => k.trim())
//         .filter(Boolean);
//     }

//     if (formOtherAuthors !== null) {
//       updateData.otherAuthors = formOtherAuthors
//         .split(",")
//         .map((a: string) => a.trim())
//         .filter(Boolean);
//     }

//     if (formIsVisible !== null) {
//       updateData.isVisible = formIsVisible === "true";
//     }

//     if (formStatus) {
//       const validStatuses = ["SUBMITTED", "UNDER_REVIEW", "IN_PROCESS", "ACCEPTED", "PUBLISHED", "REJECTED"];
//       if (!validStatuses.includes(formStatus)) {
//         return NextResponse.json({ success: false, error: "Invalid paper status" }, { status: 400 });
//       }
//       updateData.status = formStatus;
//     }

//     // Volume & Issue handling
//     const finalVolumeId = formVolumeId ?? currentPaper.volumeId;
//     const finalIssueId = formIssueId !== null ? formIssueId : currentPaper.issueId;

//     if (finalIssueId && finalIssueId !== "") {
//       const issue = await prisma.issue.findFirst({
//         where: { id: finalIssueId, volumeId: finalVolumeId },
//       });
//       if (!issue) {
//         return NextResponse.json(
//           { success: false, error: "Issue must belong to the selected volume" },
//           { status: 400 }
//         );
//       }
//       updateData.issue = { connect: { id: finalIssueId } };
//     } else if (formIssueId === "") {
//       updateData.issue = { disconnect: true };
//     }

//     if (formVolumeId) {
//       const vol = await prisma.volume.findUnique({ where: { id: formVolumeId } });
//       if (!vol) return NextResponse.json({ success: false, error: "Invalid volume" }, { status: 400 });
//       updateData.volume = { connect: { id: formVolumeId } };
//     }

//     // File handling (PDF & Image)
//     await fs.mkdir(UPLOAD_DIR, { recursive: true });

//     // PDF replacement
//     if (formPdf && formPdf.size > 0) {
//       const pdfExt = path.extname(formPdf.name) || ".pdf";
//       const pdfFilename = `${uuidv4()}${pdfExt}`;
//       const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
//       await fs.writeFile(pdfPath, Buffer.from(await formPdf.arrayBuffer()));
//       updateData.pdfUrl = `/uploads/papers/${pdfFilename}`;

//       // Delete old PDF
//       if (currentPaper.pdfUrl) {
//         const oldPath = path.join(process.cwd(), "public", currentPaper.pdfUrl);
//         await deleteFileIfExists(oldPath);
//       }
//     }

//     // Image replacement or clear
//     if (formImage && formImage.size > 0) {
//       const imgExt = path.extname(formImage.name) || ".jpg";
//       const imgFilename = `${uuidv4()}${imgExt}`;
//       const imgPath = path.join(UPLOAD_DIR, imgFilename);
//       await fs.writeFile(imgPath, Buffer.from(await formImage.arrayBuffer()));
//       updateData.imageUrl = `/uploads/papers/${imgFilename}`;

//       // Delete old image
//       if (currentPaper.imageUrl) {
//         const oldPath = path.join(process.cwd(), "public", currentPaper.imageUrl);
//         await deleteFileIfExists(oldPath);
//       }
//     } else if (formImageClear === "null" && currentPaper.imageUrl) {
//       updateData.imageUrl = null;
//       const oldPath = path.join(process.cwd(), "public", currentPaper.imageUrl);
//       await deleteFileIfExists(oldPath);
//     }

//     // Final update
//     const updatedPaper = await prisma.paper.update({
//       where: { id },
//       data: updateData,
//       include: {
//         volume: { select: { name: true, years: true } },
//         issue: { select: { issueNumber: true, period: true } },
//         uploadedBy: { select: { id: true, username: true, email: true } },
//       },
//     });

//     return NextResponse.json({ success: true, data: updatedPaper });
//   } catch (error) {
//     console.error("PATCH /admin/papers error:", error);
//     return NextResponse.json(
//       { success: false, error: error instanceof Error ? error.message : "Failed to update paper" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
//     }

//     const paper = await prisma.paper.findUnique({
//       where: { id },
//       select: { pdfUrl: true, imageUrl: true },
//     });

//     if (!paper) {
//       return NextResponse.json({ success: false, error: "Paper not found" }, { status: 404 });
//     }

//     // Cleanup files
//     if (paper.pdfUrl) {
//       const pdfPath = path.join(process.cwd(), "public", paper.pdfUrl);
//       await deleteFileIfExists(pdfPath);
//     }
//     if (paper.imageUrl) {
//       const imgPath = path.join(process.cwd(), "public", paper.imageUrl);
//       await deleteFileIfExists(imgPath);
//     }

//     await prisma.paper.delete({ where: { id } });

//     return NextResponse.json({ success: true, message: "Paper deleted successfully" });
//   } catch (error) {
//     console.error("DELETE /admin/papers error:", error);
//     return NextResponse.json({ success: false, error: "Failed to delete paper" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/papers");

async function deleteFileIfExists(filePath: string) {
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch {
    // silent fail
  }
}

// app/api/admin/papers/route.ts

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const volumeId = searchParams.get("volumeId"); // ?volumeId=xxx or absent = all

    const whereClause = volumeId ? { volumeId } : undefined;

    const papers = await prisma.paper.findMany({
      where: whereClause,
      include: {
        volume: { select: { id: true, name: true, years: true } },
        issue: { select: { id: true, issueNumber: true, period: true } },
        uploadedBy: { select: { id: true, username: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: papers });
  } catch (err) {
    console.error("GET /api/admin/papers", err);
    return NextResponse.json(
      { success: false, error: "Failed to fetch papers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    console.log(session);
    
    if (!session?.user?.email) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const title       = formData.get("title")       as string;
    const abstract    = formData.get("abstract")    as string | null;
    const keywordsStr = formData.get("keywords")    as string | null;
    const authorsStr  = formData.get("otherAuthors") as string | null;
    const volumeId    = formData.get("volumeId")    as string;
    const issueId     = formData.get("issueId")     as string | null;
    const pdfFile     = formData.get("pdf")         as File | null;
    const imageFile   = formData.get("image")       as File | null;

    if (!title?.trim() || !pdfFile || !volumeId) {
      return NextResponse.json(
        { success: false, error: "Title, PDF file and Volume are required" },
        { status: 400 }
      );
    }

    const volume = await prisma.volume.findUnique({ where: { id: volumeId } });
    if (!volume) {
      return NextResponse.json({ success: false, error: "Invalid volume" }, { status: 400 });
    }

    if (issueId) {
      const issue = await prisma.issue.findFirst({
        where: { id: issueId, volumeId },
      });
      if (!issue) {
        return NextResponse.json(
          { success: false, error: "Issue does not belong to selected volume" },
          { status: 400 }
        );
      }
    }

    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // PDF
    const pdfExt = path.extname(pdfFile.name) || ".pdf";
    const pdfFilename = `${uuidv4()}${pdfExt}`;
    const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
    await fs.writeFile(pdfPath, Buffer.from(await pdfFile.arrayBuffer()));
    const pdfUrl = `/uploads/papers/${pdfFilename}`;

    // Image (optional)
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

    const otherAuthors = authorsStr
      ? authorsStr.split(",").map(a => a.trim()).filter(Boolean)
      : [];

    const paper = await prisma.paper.create({
      data: {
        title: title.trim(),
        Abstract: abstract?.trim() || null,
        keywords,
        otherAuthors,
        pdfUrl,
        imageUrl,
        volumeId,
        issueId: issueId || null,
        isVisible: true,
        status: "SUBMITTED",
        uploadedById: session.user.id as string,
      },
      include: {
        volume: { select: { name: true, years: true } },
        issue: { select: { issueNumber: true, period: true } },
        uploadedBy: { select: { id: true, username: true, email: true } },
      },
    });

    return NextResponse.json({ success: true, data: paper }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/papers", err);
    return NextResponse.json({ success: false, error: "Failed to create paper" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData();
    const id = formData.get("id") as string;

    if (!id) {
      return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
    }

    const current = await prisma.paper.findUnique({
      where: { id },
      select: {
        pdfUrl: true,
        imageUrl: true,
        volumeId: true,
        issueId: true,
        uploadedById: true,
      },
    });

    if (!current) {
      return NextResponse.json({ success: false, error: "Paper not found" }, { status: 404 });
    }

    const title       = formData.get("title")       as string | null;
    const abstract    = formData.get("abstract")    as string | null;
    const keywordsStr = formData.get("keywords")    as string | null;
    const authorsStr  = formData.get("otherAuthors") as string | null;
    const pdfFile     = formData.get("pdf")         as File | null;
    const imageFile   = formData.get("image")       as File | null;
    const clearImage  = formData.get("imageUrl")    as string | null; // "null"
    const volumeId    = formData.get("volumeId")    as string | null;
    const issueId     = formData.get("issueId")     as string | null;
    const isVisible   = formData.get("isVisible")   as string | null;
    const status      = formData.get("status")      as string | null;
    const newPassword = formData.get("newPassword") as string | null;

    const updateData: Record<string, unknown> = {};

    // Password update
    if (newPassword?.trim() && newPassword.trim().length >= 6 && current.uploadedById) {
      const hashed = await bcrypt.hash(newPassword.trim(), 10);
      await prisma.user.update({
        where: { id: current.uploadedById },
        data: { password: hashed },
      });
    }

    if (title?.trim())       updateData.title = title.trim();
    if (abstract !== null)   updateData.Abstract = abstract?.trim() ?? null;

    if (keywordsStr !== null) {
      updateData.keywords = keywordsStr
        .split(",")
        .map((k: string) => k.trim())
        .filter(Boolean);
    }

    if (authorsStr !== null) {
      updateData.otherAuthors = authorsStr
        .split(",")
        .map((a: string) => a.trim())
        .filter(Boolean);
    }

    if (isVisible !== null) {
      updateData.isVisible = isVisible === "true";
    }

    if (status) {
      const valid = ["SUBMITTED", "UNDER_REVIEW", "IN_PROCESS", "ACCEPTED", "PUBLISHED", "REJECTED"];
      if (!valid.includes(status)) {
        return NextResponse.json({ success: false, error: "Invalid status" }, { status: 400 });
      }
      updateData.status = status;
    }

    // Volume & Issue logic
    const finalVolumeId = volumeId ?? current.volumeId;
    const finalIssueId = issueId !== null ? issueId : current.issueId;

    if (finalIssueId && finalIssueId !== "") {
      const issue = await prisma.issue.findFirst({
        where: { id: finalIssueId, volumeId: finalVolumeId },
      });
      if (!issue) {
        return NextResponse.json(
          { success: false, error: "Issue does not belong to this volume" },
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

    // Files
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    if (pdfFile && pdfFile.size > 0) {
      const ext = path.extname(pdfFile.name) || ".pdf";
      const filename = `${uuidv4()}${ext}`;
      const fullPath = path.join(UPLOAD_DIR, filename);
      await fs.writeFile(fullPath, Buffer.from(await pdfFile.arrayBuffer()));
      updateData.pdfUrl = `/uploads/papers/${filename}`;

      if (current.pdfUrl) {
        await deleteFileIfExists(path.join(process.cwd(), "public", current.pdfUrl));
      }
    }

    if (imageFile && imageFile.size > 0) {
      const ext = path.extname(imageFile.name) || ".jpg";
      const filename = `${uuidv4()}${ext}`;
      const fullPath = path.join(UPLOAD_DIR, filename);
      await fs.writeFile(fullPath, Buffer.from(await imageFile.arrayBuffer()));
      updateData.imageUrl = `/uploads/papers/${filename}`;

      if (current.imageUrl) {
        await deleteFileIfExists(path.join(process.cwd(), "public", current.imageUrl));
      }
    } else if (clearImage === "null" && current.imageUrl) {
      updateData.imageUrl = null;
      await deleteFileIfExists(path.join(process.cwd(), "public", current.imageUrl));
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
  } catch (err) {
    console.error("PATCH /api/admin/papers", err);
    return NextResponse.json({ success: false, error: "Failed to update paper" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });
    }

    const paper = await prisma.paper.findUnique({
      where: { id },
      select: { pdfUrl: true, imageUrl: true },
    });

    if (!paper) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
    }

    if (paper.pdfUrl) {
      await deleteFileIfExists(path.join(process.cwd(), "public", paper.pdfUrl));
    }
    if (paper.imageUrl) {
      await deleteFileIfExists(path.join(process.cwd(), "public", paper.imageUrl));
    }

    await prisma.paper.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/admin/papers", err);
    return NextResponse.json({ success: false, error: "Failed to delete" }, { status: 500 });
  }
}