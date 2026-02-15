export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from '@/libs/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const user = await currentUser()
		// Take projectID from the query params
		const projectID = req.nextUrl.searchParams.get('projectID') || undefined

		if (!user || !projectID) {
			return NextResponse.json(
				{ error: 'Unauthorized or missing project ID' },
				{ status: 401 }
			)
		}

		const project = await prisma.project.findUnique({
			where: {
				id: projectID,
			},
		})

		if (!project || !project.webhookLink) {
			return NextResponse.json(
				{ error: 'Project not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ success: true, webhookLink: project.webhookLink })
	} catch (err) {
		console.error('Connection error:', err)
		if (err) {
			return NextResponse.json({ error: err.message })
		}
		return NextResponse.json(
			{ error: 'An unexpected error occurred' },
			{ status: 500 }
		)
	}
}
