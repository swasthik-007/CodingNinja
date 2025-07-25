import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Excel Mock Interviewer API',
  });
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
