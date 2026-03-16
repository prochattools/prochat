import type { Prisma } from '@prisma/client'
import prisma from '@/libs/prisma'
import { backfillLicenseRecordsFromStripe } from '@/lib/store/stripe'

export interface LicenseListItem {
  id: string
  purchaserEmail: string
  product: 'saaskit' | 'prokit' | 'uxkit'
  paymentReference: string
  paymentStatus: string
  provisioningStatus: string
  accessStatus: string
  githubUsername: string | null
  revokedAt: Date | null
  revokedReason: string | null
  createdAt: Date
  updatedAt: Date
  events: Array<{
    id: string
    type: string
    metadata: Prisma.JsonValue | null
    createdAt: Date
  }>
}

export async function listAdminLicenses(): Promise<LicenseListItem[]> {
  const existingCount = await prisma.license.count()
  if (existingCount === 0) {
    await backfillLicenseRecordsFromStripe()
  }

  const licenses = await prisma.license.findMany({
    orderBy: { created_at: 'desc' },
    include: {
      events: {
        orderBy: { created_at: 'desc' },
        take: 4,
      },
    },
  })

  return licenses.map(license => ({
    id: license.id,
    purchaserEmail: license.purchaser_email,
    product: license.product,
    paymentReference: license.payment_reference,
    paymentStatus: license.payment_status,
    provisioningStatus: license.provisioning_status,
    accessStatus: license.access_status,
    githubUsername: license.github_username,
    revokedAt: license.revoked_at,
    revokedReason: license.revoked_reason,
    createdAt: license.created_at,
    updatedAt: license.updated_at,
    events: license.events.map(event => ({
      id: event.id,
      type: event.type,
      metadata: event.metadata,
      createdAt: event.created_at,
    })),
  }))
}
