import { Prisma } from '@prisma/client'
import prisma from '@/libs/prisma'

const LICENSE_TABLES = ['License', 'LicenseEvent'] as const

type LicenseTableName = (typeof LICENSE_TABLES)[number]

type TableRow = {
  table_name: string
}

export type LicenseStorageState =
  | {
      status: 'ready'
    }
  | {
      status: 'missing'
      message: string
      missingTables: LicenseTableName[]
    }

function getMissingStorageMessage(missingTables: LicenseTableName[]) {
  const joinedTables = missingTables.join(', ')
  return `Licensing storage is not initialized in schema ${getCurrentSchemaLabel()}. Missing table${missingTables.length === 1 ? '' : 's'}: ${joinedTables}. Run the production provisioning and Prisma migration path for this tenant before using /admin/licenses.`
}

function getCurrentSchemaLabel() {
  const databaseUrl = process.env.DATABASE_URL ?? ''
  const match = databaseUrl.match(/[?&]schema=([^&]+)/i)
  return match?.[1] ? decodeURIComponent(match[1]) : 'the current schema'
}

export function logLicenseStorageMissing(context: string, state: Extract<LicenseStorageState, { status: 'missing' }>) {
  console.error(`[license-storage] ${context}`, {
    schema: getCurrentSchemaLabel(),
    missingTables: state.missingTables,
    message: state.message,
  })
}

export function isLicenseStorageError(error: unknown) {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return false
  }

  if (error.code !== 'P2021' && error.code !== 'P2022') {
    return false
  }

  return /License(Event)?/i.test(error.message)
}

export function getMissingLicenseStorageState() {
  const missingTables = [...LICENSE_TABLES]
  return {
    status: 'missing' as const,
    message: getMissingStorageMessage(missingTables),
    missingTables,
  }
}

export async function getLicenseStorageState(): Promise<LicenseStorageState> {
  const rows = await prisma.$queryRaw<TableRow[]>(Prisma.sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = current_schema()
      AND table_name IN (${Prisma.join(LICENSE_TABLES.map(table => Prisma.sql`${table}`))})
  `)

  const existingTables = new Set(rows.map(row => row.table_name))
  const missingTables = LICENSE_TABLES.filter(table => !existingTables.has(table))

  if (missingTables.length === 0) {
    return { status: 'ready' }
  }

  return {
    status: 'missing',
    message: getMissingStorageMessage(missingTables),
    missingTables,
  }
}
