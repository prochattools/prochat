import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(
    {
      error: 'Authentication and tenant authorization are not yet implemented.',
      detail: 'This endpoint requires runtime session validation and tenant-scoped authorization.',
    },
    { status: 501 }
  );
}
