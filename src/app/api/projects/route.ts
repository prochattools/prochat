export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NextResponse } from 'next/server'

export async function GET() {
	return NextResponse.json(
		{
			error: 'Runtime authentication is not implemented yet. Ory session validation is still TODO.',
		},
		{ status: 501 }
	)
}
