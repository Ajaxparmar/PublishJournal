// src/app/api/latest-volume/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const latestVolume = await prisma.volume.findFirst({
      where: {
        Archive: false,     // ← only non-archived
        isVisible: true,    // ← optional safety filter
      },
      include: {
        issues: {
          include: {
            _count: {
              select: { papers: true },  // number of papers per issue
            },
          },
          orderBy: { createdAt: 'desc' }, // newest issues first
        },
        _count: {
          select: { papers: true },  // total papers in volume
        },
      },
      orderBy: [
        // Sort by year descending (most recent year first)
        { years: 'desc' },
        // If years are equal → newest creation date
        { createdAt: 'desc' },
      ],
    });

    if (!latestVolume) {
      return NextResponse.json(
        {
          success: false,
          message: 'No current (non-archived) volume found at this time.',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: latestVolume,
    });
  } catch (error) {
    console.error('[API /latest-volume] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error while fetching latest volume',
      },
      { status: 500 }
    );
  }
}