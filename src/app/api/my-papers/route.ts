// app/api/my-papers/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const papers = await prisma.paper.findMany({
      where: {
        uploadedById: decoded.userId,
      },
      include: {
        volume: { select: { name: true } },
        issue: { select: { issueNumber: true } },
      },
      orderBy: { createdAt: 'desc' },
    });   
    return NextResponse.json({ success: true, data: papers });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch papers' },
      { status: 500 }
    );
  }
}