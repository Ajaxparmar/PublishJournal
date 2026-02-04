import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  success,
  badRequest,
  notFound,
  serverError,
  unauthorized,
} from "@/lib/api-response";


export async function POST(req: NextRequest) {
  try {

    const body = await req.json();
    const { volumeId, issueNumber, year, period, description } = body;

    if (!volumeId || !issueNumber?.trim()) {
      return badRequest("volumeId and issueNumber are required");
    }

    const volume = await prisma.volume.findUnique({
      where: { id: volumeId },
      select: { id: true },
    });

    if (!volume) {
      return notFound("Volume not found");
    }

    const normalizedIssue = issueNumber.trim();

    const issue = await prisma.issue.create({
      data: {
        volumeId,
        issueNumber: normalizedIssue,
        year: year ? Number(year) : null,
        period: period?.trim() || null,
        description: description?.trim() || null,
      },
      include: {
        volume: {
          select: { id: true, name: true },
        },
      },
    });

    return success("Issue created");
  } catch (err: unknown) {
    console.error("[POST /api/issues]", err);
    return serverError("Failed to create issue", err instanceof Error ? err.message : undefined);
  }
}