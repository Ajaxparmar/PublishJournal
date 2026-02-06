// app/api/my-papers/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route'; // adjust path if different

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { success: false, error: 'Not authenticated' },
      { status: 401 }
    );
  }

  const userId = session.user.id; // or session.user.email if you use email as id

  try {
    const papers = await prisma.paper.findMany({
      where: { uploadedById: userId },
      include: {
        volume: { select: { name: true } },
        issue: { select: { issueNumber: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: papers });
  } catch (error) {
    console.error('Error in /api/my-papers:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch papers' },
      { status: 500 }
    );
  }
}