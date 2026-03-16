import config from '@/config'
import { NextResponse } from 'next/server'
import prisma from '@/libs/prisma'
import { resendService } from '@/libs/resend'
import { getCurrentAdminUser, isAdminUser } from '@/lib/admin'
import { getGithubConfig, removeCollaborator } from '@/lib/store/github'
import type { LicenseEventType } from '@prisma/client'
import type { ProductSlug } from '@/lib/store/types'

export async function POST(request: Request) {
  const user = await getCurrentAdminUser()
  if (!isAdminUser(user)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const payload = await request.json().catch(() => ({}))
  const licenseId = String(payload?.licenseId || '')
  const reason = String(payload?.reason || '').trim()

  if (!licenseId) {
    return NextResponse.json({ error: 'Missing licenseId' }, { status: 400 })
  }

  const license = await prisma.license.findUnique({ where: { id: licenseId } })
  if (!license) {
    return NextResponse.json({ error: 'License not found' }, { status: 404 })
  }

  if (license.access_status === 'revoked') {
    return NextResponse.json({ error: 'License already revoked' }, { status: 409 })
  }

  if (!license.github_username) {
    return NextResponse.json({ error: 'Missing GitHub username' }, { status: 400 })
  }

  const supportedProducts: ProductSlug[] = ['saaskit', 'prokit']
  if (!supportedProducts.includes(license.product as ProductSlug)) {
    return NextResponse.json(
      { error: 'GitHub revocation not supported for this product' },
      { status: 400 },
    )
  }
  const productSlug = license.product as ProductSlug
  const removal = await removeCollaborator(productSlug, license.github_username)
  if ('error' in removal) {
    return NextResponse.json(
      { error: removal.message ?? 'GitHub collaborator removal failed' },
      { status: 500 },
    )
  }

  const now = new Date()
  await prisma.$transaction([
    prisma.license.update({
      where: { id: licenseId },
      data: {
        access_status: 'revoked',
        revoked_at: now,
        revoked_reason: reason || 'admin_revocation',
      },
    }),
    prisma.licenseEvent.create({
      data: {
        license_id: licenseId,
        type: 'access_revoked' as LicenseEventType,
        metadata: {
          reason: reason || null,
          performedBy: user?.id ?? 'system',
          githubUsername: license.github_username,
        },
      },
    }),
  ])

  const PRODUCT_LABELS: Record<ProductSlug, string> = {
    saaskit: 'SaaSKit',
    prokit: 'ProKit',
  }
  const productLabel = PRODUCT_LABELS[productSlug]
  const { repoOwner, repoName } = getGithubConfig(productSlug)
  try {
    await resendService.sendLicenseRevokedEmail(license.purchaser_email, {
      productName: productLabel,
      repoName: `${repoOwner}/${repoName}`,
    })
  } catch (error) {
    console.error('[admin/licenses] Failed to send revocation email', { error, licenseId })
    return NextResponse.json(
      { error: 'Revocation email failed to send' },
      { status: 500 },
    )
  }

  await prisma.licenseEvent.create({
    data: {
      license_id: licenseId,
      type: 'revocation_email_sent' as LicenseEventType,
      metadata: {
        performedBy: user?.id ?? 'system',
        supportEmail: config.resend.supportEmail,
      },
    },
  })

  return NextResponse.json({ success: true })
}
