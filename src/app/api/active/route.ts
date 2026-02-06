import prisma from '@/libs/prisma'
import { currentUser } from '@clerk/nextjs/server'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    const { projectId } = (await req.json()) as { projectId?: string }

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (!projectId) {
      return NextResponse.json({ error: 'Missing projectId' }, { status: 400 })
    }

    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        user_clerk_id: user.id,
      },
      select: {
        id: true,
        scenario_id: true,
        status: true,
        type: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    if (project.type !== 'n8n') {
      // Legacy non-n8n integrations were removed. Keep the response explicit for old DB rows.
      return NextResponse.json(
        { error: 'Only n8n projects are supported' },
        { status: 501 }
      )
    }

    if (!project.scenario_id) {
      return NextResponse.json(
        { error: 'Project workflow ID missing' },
        { status: 400 }
      )
    }

    const N8N_API_KEY = process.env.N8N_API_KEY
    const N8N_BASE_URL = process.env.N8N_API_URL

    if (!N8N_API_KEY || !N8N_BASE_URL) {
      return NextResponse.json(
        {
          error:
            'n8n is not configured. Set N8N_API_KEY and N8N_API_URL to enable workflow activation.',
        },
        { status: 501 }
      )
    }

    const headers = { 'X-N8N-API-KEY': N8N_API_KEY }
    const workflowId = project.scenario_id

    if (project.status === 'active') {
      await axios.post(
        `${N8N_BASE_URL}/workflows/${workflowId}/deactivate`,
        {},
        { headers }
      )

      await prisma.project.update({
        where: { id: project.id },
        data: { status: 'inactive' },
      })
    } else {
      await axios.post(
        `${N8N_BASE_URL}/workflows/${workflowId}/activate`,
        {},
        { headers }
      )

      await prisma.project.update({
        where: { id: project.id },
        data: { status: 'active' },
      })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Activation error:', err)

    return NextResponse.json(
      {
        error:
          err?.response?.data?.message || err?.message || 'Failed to toggle workflow',
        details: err?.response?.data,
      },
      { status: err?.response?.status || 500 }
    )
  }
}
