import prisma from '@/libs/prisma'
import { currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser()
    const projectID = req.nextUrl.searchParams.get('projectID')

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!projectID) {
      return NextResponse.json({ error: 'Missing projectID' }, { status: 400 })
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectID,
        user_clerk_id: user.id,
      },
      select: {
        webhookLink: true,
      },
    })

    if (!project?.webhookLink) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, webhookLink: project.webhookLink })
  } catch (err: any) {
    console.error('Connection error:', err)
    return NextResponse.json(
      { error: err?.message || 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
