import { PrismaClient } from '@prisma/client'

// In GitHub Actions CI, we don't want to instantiate a real PrismaClient during `next build`,
// because the build only needs to type-check and bundle, not hit a database. GitHub sets CI="true".
// In local dev and production (CI !== "true"), we instantiate PrismaClient normally.

const prisma =
  process.env.CI === 'true'
    ? ({} as unknown as PrismaClient)
    : new PrismaClient()

export default prisma
