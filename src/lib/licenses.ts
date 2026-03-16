import prisma from '@/libs/prisma'

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
}

export async function listAdminLicenses(): Promise<LicenseListItem[]> {
  const licenses = await prisma.license.findMany({
    orderBy: { created_at: 'desc' },
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
  }))
}
