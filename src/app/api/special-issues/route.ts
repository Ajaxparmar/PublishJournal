import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const latestVolume = await prisma.volume.findFirst({
      where: {
        Archive: true,
        isVisible: true,
      },
      include: {
        issues: {
          where: { isVisible: true, SpecialIssue: true },
          include: {
            _count: {
              select: { papers: true },
            },
          },
          orderBy: [
            { SpecialIssue: 'desc' },   // Special issues come first
            { createdAt: 'desc' },
          ],
        },
        _count: {
          select: { papers: true },
        },
      },
      orderBy: [
        { years: 'desc' },
        { createdAt: 'desc' },
      ],
    });

    console.log("this is ",latestVolume);
    

    if (!latestVolume) {
      return NextResponse.json(
        { success: false, message: 'No current volume found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: latestVolume,
    });
  } catch (error) {
    console.error('GET /api/latest-volume error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}