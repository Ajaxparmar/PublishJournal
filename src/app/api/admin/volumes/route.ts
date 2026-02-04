// app/api/admin/volumes/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const volumes = await prisma.volume.findMany({
      include: {
        issues: {
          select: { id: true, issueNumber: true, year: true, period: true },
        },
        _count: { select: { papers: true } },
      },
      orderBy: { years: "desc" },
    });

    return NextResponse.json({ success: true, data: volumes });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch volumes" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, years, createdById } = body;

    if (!name || !years) {
      return NextResponse.json({ success: false, error: "Name and year are required" }, { status: 400 });
    }

    const volume = await prisma.volume.create({
      data: {
        name,
        description,
        years,
        createdById: createdById || null, // optional - admin can be null
        isVisible: true,
      },
    });

    return NextResponse.json({ success: true, data: volume }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to create volume" }, { status: 500 });
  }
}

// app/api/admin/volumes/route.ts
// ... existing GET and POST ...

// PATCH - Update existing volume
export async function PATCH(request: NextRequest) {
    try {
      const body = await request.json();
      const { id, name, years, description, isVisible, Archive } = body;
  
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        return NextResponse.json(
          { success: false, error: "Valid volume ID required" },
          { status: 400 }
        );
      }
  
      // Optional: validate required fields
      if (!name || !years) {
        return NextResponse.json(
          { success: false, error: "Name and years are required" },
          { status: 400 }
        );
      }
  
      const updatedVolume = await prisma.volume.update({
        where: { id },
        data: {
          name,
          years,
          description,
          isVisible: typeof isVisible === "boolean" ? isVisible : undefined,
          Archive: typeof Archive === "boolean" ? Archive : undefined,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          name: true,
          years: true,
          description: true,
          isVisible: true,
          Archive: true,
        },
      });
  
      return NextResponse.json({ success: true, data: updatedVolume });
    } catch (error: unknown) {
      console.error("PATCH /admin/volumes error:", error);
      if (error instanceof Error && error.message.includes("Record to update not found")) {
        return NextResponse.json(
          { success: false, error: "Volume not found" },
          { status: 404 }
        );
    }
      return NextResponse.json(
        { success: false, error: "Failed to update volume" },
        { status: 500 }
      );
    }
  } 


  // app/api/admin/volumes/route.ts

// ... keep your existing GET, POST, PATCH ...

// DELETE - Remove a volume
export async function DELETE(request: NextRequest) {
    try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get("id");
  
      if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
        return NextResponse.json(
          { success: false, error: "Valid volume ID required" },
          { status: 400 }
        );
      }
  
      // Optional: check if volume has papers or issues (prevent accidental delete)
      const volume = await prisma.volume.findUnique({
        where: { id },
        include: {
          _count: {
            select: { papers: true, issues: true },
          },
        },
      });
  
      if (!volume) {
        return NextResponse.json(
          { success: false, error: "Volume not found" },
          { status: 404 }
        );
      }
  
      if (volume._count.papers > 0 || volume._count.issues > 0) {
        return NextResponse.json(
          {
            success: false,
            error: "Cannot delete volume that contains papers or issues",
          },
          { status: 409 }
        );
      }
  
      await prisma.volume.delete({
        where: { id },
      });
  
      return NextResponse.json({ success: true, message: "Volume deleted successfully" });
    } catch (error: unknown) {
      console.error("DELETE /admin/volumes error:", error);
      return NextResponse.json(
        { success: false, error: "Failed to delete volume" },
        { status: 500 }
      );
    }
  }