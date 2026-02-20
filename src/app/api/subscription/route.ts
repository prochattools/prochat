import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import prisma from '@/libs/prisma'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(_req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized. Please provide a valid Clerk session token.' },
        { status: 401 }
      )
    }

    const subscription = await prisma.subscription.findFirst({
      where: {
        user_clerk_id: userId,
      },
      select: {
        id: true,
        sub_status: true,
        sub_type: true,
        user_email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    const hasSubscription = subscription?.sub_status === 'active'

    return NextResponse.json({
      success: true,
      hasSubscription,
      subscription: subscription || null,
    })
  } catch (error: any) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error',
      },
      { status: 500 }
    )
  }
}
