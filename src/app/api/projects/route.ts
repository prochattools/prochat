export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server'

export async function GET() {
	return NextResponse.json(
		{
			error: 'Runtime authentication is deferred. Ory session validation is not enabled, so this internal route remains fail-closed.',
		},
		{ status: 501 }
	)
}
