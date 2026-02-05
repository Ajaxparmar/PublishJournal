// // // app/api/admin/papers/route.ts
// // import { NextRequest, NextResponse } from "next/server";
// // import { prisma } from "@/lib/prisma";

// // export async function GET() {
// //   try {
// //     const papers = await prisma.paper.findMany({
// //       include: {
// //         volume: {
// //           select: {
// //             id: true,
// //             name: true,
// //             years: true,
// //           },
// //         },
// //         issue: {
// //           select: {
// //             id: true,
// //             issueNumber: true,
// //             period: true,
// //           },
// //         },
// //         authors: {
// //           select: {
// //             fullName: true,
// //             organization: true,
// //             country: true,
// //             email: true,
// //           },
// //         },
// //         uploadedBy: {
// //           select: {
// //             id: true,
// //             username: true,
// //             email: true,
// //           },
// //         },
// //       },
// //       orderBy: {
// //         createdAt: "desc",
// //       },
// //     });

// //     return NextResponse.json({ success: true, data: papers });
// //   } catch (error) {
// //     console.error("GET /admin/papers error:", error);
// //     return NextResponse.json(
// //       { success: false, error: "Failed to fetch papers" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function POST(request: NextRequest) {
// //   try {
// //     const body = await request.json();

// //     const {
// //       title,
// //       Abstract,
// //       keywords,
// //       pdfUrl,
// //       volumeId,
// //       issueId,
// //       isVisible = true,
// //     } = body;

// //     // Required fields validation
// //     if (!title || !pdfUrl || !volumeId) {
// //       return NextResponse.json(
// //         { success: false, error: "Title, PDF URL, and Volume ID are required" },
// //         { status: 400 }
// //       );
// //     }

// //     // Check if volume exists
// //     const volumeExists = await prisma.volume.findUnique({
// //       where: { id: volumeId },
// //     });
// //     if (!volumeExists) {
// //       return NextResponse.json(
// //         { success: false, error: "Invalid volume ID" },
// //         { status: 400 }
// //       );
// //     }

// //     // If issueId provided, validate it belongs to the volume
// //     if (issueId) {
// //       const issueExists = await prisma.issue.findFirst({
// //         where: {
// //           id: issueId,
// //           volumeId,
// //         },
// //       });
// //       if (!issueExists) {
// //         return NextResponse.json(
// //           { success: false, error: "Issue does not belong to selected volume" },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     const newPaper = await prisma.paper.create({
// //       data: {
// //         title,
// //         Abstract: Abstract || null,
// //         keywords: Array.isArray(keywords) ? keywords : [],
// //         pdfUrl,
// //         volumeId,
// //         issueId: issueId || null,
// //         isVisible,
// //       },
// //       include: {
// //         volume: { select: { name: true, years: true } },
// //         issue: { select: { issueNumber: true, period: true } },
// //       },
// //     });

// //     return NextResponse.json({ success: true, data: newPaper }, { status: 201 });
// //   } catch (error) {
// //     console.error("POST /admin/papers error:", error);
// //     return NextResponse.json(
// //       { success: false, error: "Failed to create paper" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function PATCH(request: NextRequest) {
// //   try {
// //     const body = await request.json();
// //     const {
// //       id,
// //       title,
// //       Abstract,
// //       keywords,
// //       pdfUrl,
// //       volumeId,
// //       issueId,
// //       isVisible,
// //     } = body;

// //     if (!id) {
// //       return NextResponse.json(
// //         { success: false, error: "Paper ID is required" },
// //         { status: 400 }
// //       );
// //     }

// //     // Optional: validate volume if changed
// //     if (volumeId) {
// //       const volumeExists = await prisma.volume.findUnique({
// //         where: { id: volumeId },
// //       });
// //       if (!volumeExists) {
// //         return NextResponse.json(
// //           { success: false, error: "Invalid volume ID" },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     // If issueId provided and not null, validate it belongs to volume
// //     if (issueId) {
// //       const issue = await prisma.issue.findFirst({
// //         where: {
// //           id: issueId,
// //           volumeId: volumeId || undefined, // if volumeId not changing, skip
// //         },
// //       });
// //       if (!issue) {
// //         return NextResponse.json(
// //           { success: false, error: "Issue does not belong to selected volume" },
// //           { status: 400 }
// //         );
// //       }
// //     }

// //     const updatedPaper = await prisma.paper.update({
// //       where: { id },
// //       data: {
// //         title: title !== undefined ? title : undefined,
// //         Abstract: Abstract !== undefined ? Abstract : undefined,
// //         keywords: Array.isArray(keywords)
// //           ? keywords
// //           : keywords !== undefined
// //           ? keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
// //           : undefined,
// //         pdfUrl: pdfUrl !== undefined ? pdfUrl : undefined,
// //         volumeId: volumeId !== undefined ? volumeId : undefined,
// //         issueId: issueId !== undefined ? (issueId || null) : undefined,
// //         isVisible: typeof isVisible === "boolean" ? isVisible : undefined,
// //       },
// //       include: {
// //         volume: { select: { name: true, years: true } },
// //         issue: { select: { issueNumber: true, period: true } },
// //       },
// //     });

// //     return NextResponse.json({ success: true, data: updatedPaper });
// //   } catch (error) {
// //     console.error("PATCH /admin/papers error:", error);
// //     return NextResponse.json(
// //       { success: false, error: "Failed to update paper" },
// //       { status: 500 }
// //     );
// //   }
// // }

// // export async function DELETE(request: NextRequest) {
// //   try {
// //     const { searchParams } = new URL(request.url);
// //     const id = searchParams.get("id");

// //     if (!id) {
// //       return NextResponse.json(
// //         { success: false, error: "Paper ID is required" },
// //         { status: 400 }
// //       );
// //     }

// //     await prisma.paper.delete({
// //       where: { id },
// //     });

// //     return NextResponse.json({ success: true, message: "Paper deleted" });
// //   } catch (error) {
// //     console.error("DELETE /admin/papers error:", error);
// //     return NextResponse.json(
// //       { success: false, error: "Failed to delete paper" },
// //       { status: 500 }
// //     );
// //   }
// // }


// // app/api/admin/papers/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   try {
//     const papers = await prisma.paper.findMany({
//       include: {
//         volume: {
//           select: {
//             id: true,
//             name: true,
//             years: true,
//           },
//         },
//         issue: {
//           select: {
//             id: true,
//             issueNumber: true,
//             period: true,
//           },
//         },
//         authors: {
//           select: {
//             fullName: true,
//             organization: true,
//             country: true,
//             email: true,
//           },
//         },
//         uploadedBy: {
//           select: {
//             id: true,
//             username: true,
//             email: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return NextResponse.json({ success: true, data: papers });
//   } catch (error) {
//     console.error("GET /admin/papers error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to fetch papers" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     const {
//       title,
//       Abstract,
//       keywords = [],
//       pdfUrl,
//       imageUrl,
//       volumeId,
//       issueId,
//       isVisible = true,
//     } = body;

//     // Required fields validation
//     if (!title || !pdfUrl || !volumeId) {
//       return NextResponse.json(
//         { success: false, error: "Title, PDF URL, and Volume ID are required" },
//         { status: 400 }
//       );
//     }

//     // Validate volume exists
//     const volume = await prisma.volume.findUnique({
//       where: { id: volumeId },
//     });
//     if (!volume) {
//       return NextResponse.json(
//         { success: false, error: "Invalid volume ID" },
//         { status: 400 }
//       );
//     }

//     // If issueId is provided, validate it belongs to the selected volume
//     if (issueId) {
//       const issue = await prisma.issue.findFirst({
//         where: {
//           id: issueId,
//           volumeId,
//         },
//       });
//       if (!issue) {
//         return NextResponse.json(
//           { success: false, error: "Issue does not belong to selected volume" },
//           { status: 400 }
//         );
//       }
//     }

//     const newPaper = await prisma.paper.create({
//       data: {
//         title,
//         Abstract: Abstract || null,
//         keywords: Array.isArray(keywords) ? keywords : [],
//         pdfUrl,
//         imageUrl: imageUrl || null,           
//         volumeId,
//         issueId: issueId || null,
//         isVisible,
//       },
//       include: {
//         volume: { select: { name: true, years: true } },
//         issue: { select: { issueNumber: true, period: true } },
//       },
//     });

//     return NextResponse.json({ success: true, data: newPaper }, { status: 201 });
//   } catch (error) {
//     console.error("POST /admin/papers error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to create paper" },
//       { status: 500 }
//     );
//   }
// }

// export async function PATCH(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const {
//       id,
//       title,
//       Abstract,
//       keywords,
//       pdfUrl,
//       imageUrl,
//       volumeId,
//       issueId,
//       isVisible,
//     } = body;

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: "Paper ID is required" },
//         { status: 400 }
//       );
//     }

//     // Optional: validate volume if being changed
//     if (volumeId) {
//       const volumeExists = await prisma.volume.findUnique({
//         where: { id: volumeId },
//       });
//       if (!volumeExists) {
//         return NextResponse.json(
//           { success: false, error: "Invalid volume ID" },
//           { status: 400 }
//         );
//       }
//     }

//     // Optional: validate issue if provided
//     if (issueId) {
//       const issue = await prisma.issue.findFirst({
//         where: {
//           id: issueId,
//           volumeId: volumeId || undefined, // if volumeId not changing, skip
//         },
//       });
//       if (!issue) {
//         return NextResponse.json(
//           { success: false, error: "Issue does not belong to selected volume" },
//           { status: 400 }
//         );
//       }
//     }

//     const updatedPaper = await prisma.paper.update({
//       where: { id },
//       data: {
//         title: title !== undefined ? title : undefined,
//         Abstract: Abstract !== undefined ? Abstract : undefined,
//         keywords: Array.isArray(keywords)
//           ? keywords
//           : keywords !== undefined
//           ? keywords.split(",").map((k: string) => k.trim()).filter(Boolean)
//           : undefined,
//         pdfUrl: pdfUrl !== undefined ? pdfUrl : undefined,
//         imageUrl: imageUrl !== undefined ? (imageUrl || null) : undefined,  // ← NEW: support imageUrl update
//         volumeId: volumeId !== undefined ? volumeId : undefined,
//         issueId: issueId !== undefined ? (issueId || null) : undefined,
//         isVisible: typeof isVisible === "boolean" ? isVisible : undefined,
//       },
//       include: {
//         volume: { select: { name: true, years: true } },
//         issue: { select: { issueNumber: true, period: true } },
//       },
//     });

//     return NextResponse.json({ success: true, data: updatedPaper });
//   } catch (error) {
//     console.error("PATCH /admin/papers error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to update paper" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json(
//         { success: false, error: "Paper ID is required" },
//         { status: 400 }
//       );
//     }

//     await prisma.paper.delete({
//       where: { id },
//     });

//     return NextResponse.json({ success: true, message: "Paper deleted successfully" });
//   } catch (error) {
//     console.error("DELETE /admin/papers error:", error);
//     return NextResponse.json(
//       { success: false, error: "Failed to delete paper" },
//       { status: 500 }
//     );
//   }
// }


// app/api/admin/papers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

// Directory to store uploaded files (create it manually or in code)
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads/papers");

export async function GET() {
  try {
    const papers = await prisma.paper.findMany({
      include: {
        volume: { select: { id: true, name: true, years: true } },
        issue: { select: { id: true, issueNumber: true, period: true } },
        authors: { select: { fullName: true, organization: true, country: true, email: true } },
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
        { success: false, error: "Title, PDF file, and Volume ID are required" },
        { status: 400 }
      );
    }

    // Validate volume
    const volume = await prisma.volume.findUnique({ where: { id: volumeId } });
    if (!volume) {
      return NextResponse.json({ success: false, error: "Invalid volume ID" }, { status: 400 });
    }

    // Validate issue if provided
    if (issueId) {
      const issue = await prisma.issue.findFirst({ where: { id: issueId, volumeId } });
      if (!issue) {
        return NextResponse.json(
          { success: false, error: "Issue does not belong to selected volume" },
          { status: 400 }
        );
      }
    }

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Handle PDF upload
    const pdfExt = path.extname(pdfFile.name);
    const pdfFilename = `${uuidv4()}${pdfExt}`;
    const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
    await fs.writeFile(pdfPath, Buffer.from(await pdfFile.arrayBuffer()));
    const pdfUrl = `/uploads/papers/${pdfFilename}`;

    // Handle image upload (optional)
    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const imgExt = path.extname(imageFile.name);
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
      },
      include: {
        volume: { select: { name: true, years: true } },
        issue: { select: { issueNumber: true, period: true } },
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
    const title = formData.get("title") as string | null;
    const abstract = formData.get("abstract") as string | null;
    const keywordsStr = formData.get("keywords") as string | null;
    const pdfFile = formData.get("pdf") as File | null;
    const imageFile = formData.get("image") as File | null;
    const volumeId = formData.get("volumeId") as string | null;
    const issueId = formData.get("issueId") as string | null;
    const isVisibleStr = formData.get("isVisible") as string | null;

    if (!id) {
      return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
    }

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    let pdfUrl: string | undefined;
    if (pdfFile && pdfFile.size > 0) {
      const pdfExt = path.extname(pdfFile.name);
      const pdfFilename = `${uuidv4()}${pdfExt}`;
      const pdfPath = path.join(UPLOAD_DIR, pdfFilename);
      await fs.writeFile(pdfPath, Buffer.from(await pdfFile.arrayBuffer()));
      pdfUrl = `/uploads/papers/${pdfFilename}`;
    }

    let imageUrl: string | null | undefined;
    if (imageFile && imageFile.size > 0) {
      const imgExt = path.extname(imageFile.name);
      const imgFilename = `${uuidv4()}${imgExt}`;
      const imgPath = path.join(UPLOAD_DIR, imgFilename);
      await fs.writeFile(imgPath, Buffer.from(await imageFile.arrayBuffer()));
      imageUrl = `/uploads/papers/${imgFilename}`;
    } else if (imageFile === null) {
      // If client explicitly sent null (cleared image)
      imageUrl = null;
    }

    const keywords = keywordsStr !== null
      ? keywordsStr.split(",").map(k => k.trim()).filter(Boolean)
      : undefined;

    const updateData: Record<string, unknown> = {};
    if (title) updateData.title = title;
    if (abstract !== null) updateData.Abstract = abstract;
    if (keywords !== undefined) updateData.keywords = keywords;
    if (pdfUrl) updateData.pdfUrl = pdfUrl;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    if (volumeId) updateData.volumeId = volumeId;
    if (issueId !== null) updateData.issueId = issueId || null;
    if (isVisibleStr !== null) updateData.isVisible = isVisibleStr === "true";

    // Validation
    if (volumeId) {
      const vol = await prisma.volume.findUnique({ where: { id: volumeId } });
      if (!vol) return NextResponse.json({ success: false, error: "Invalid volume" }, { status: 400 });
    }

    if (issueId) {
      const issue = await prisma.issue.findFirst({
        where: { id: issueId, volumeId: volumeId || undefined },
      });
      if (!issue) return NextResponse.json({ success: false, error: "Invalid issue" }, { status: 400 });
    }

    const updated = await prisma.paper.update({
      where: { id },
      data: updateData,
      include: {
        volume: { select: { name: true, years: true } },
        issue: { select: { issueNumber: true, period: true } },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("PATCH /admin/papers error:", error);
    return NextResponse.json({ success: false, error: "Failed to update paper" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Paper ID required" }, { status: 400 });
    }

    await prisma.paper.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Paper deleted successfully" });
  } catch (error) {
    console.error("DELETE /admin/papers error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete paper" }, { status: 500 });
  }
}