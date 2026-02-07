import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";           
import {
  success,
  badRequest,
  serverError,
} from "@/lib/api-response";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, years } = body;
    console.log("Received volume data:", body);
    
    if (!name?.trim()) {
      return badRequest("Volume name is required");
    }

    const normalizedName = name.trim();

    const existing = await prisma.volume.findFirst({
      where: { name: normalizedName },
    });

    if (existing) {
      return badRequest("A volume with this name already exists");
    }

    const volume = await prisma.volume.create({
      data: {
        name: normalizedName,
        description: description?.trim() || null,
        years: years ,
      },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
      },
    });

    return success("Volume created", "201");
  } catch (err: unknown) {
    console.error("[POST /api/volumes]", err);
    return serverError("Failed to create volume", err instanceof Error ? err.message : undefined);
  }
}

// write delete api for volume
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("delete id",id);
    
    if (!id) {
      return badRequest("Volume ID is required");
    }

    await prisma.volume.delete({
      where: { id },
    });

    return success("Volume deleted");
  } catch (err: unknown) {
    console.error("[DELETE /api/volumes]", err);
    return serverError("Failed to delete volume", err instanceof Error ? err.message : undefined);
  }
}


export async function GET(req: NextRequest) {
  try {
    const volumes = await prisma.volume.findMany({
      where: {
        isVisible: true,
        Archive: true,
      },
      include: {
        issues: {
          where: {
            isVisible: true,
          },
          orderBy: [
            { year: 'desc' },
            { issueNumber: 'asc' },
          ],
          select: {
            id: true,
            issueNumber: true,
            year: true,
            period: true,
            description: true,
            _count: {
              select: { papers: true },
            },
          },
        },
        _count: {
          select: { papers: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return success("Volumes fetched successfully", JSON.stringify(volumes));
  } catch (err: unknown) {
    console.error("[GET /api/volumes]", err);
    return serverError(
      "Failed to fetch volumes",
      err instanceof Error ? err.message : undefined
    );
  }
}

