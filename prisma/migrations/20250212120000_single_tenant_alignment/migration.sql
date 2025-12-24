-- Ensure registry table matches canonical infra contract
CREATE TABLE IF NOT EXISTS public.tenants (
    slug text PRIMARY KEY,
    schema_name text NOT NULL,
    db_user text NOT NULL,
    db_password text NOT NULL,
    type text NOT NULL,
    external_id text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS tenants_slug_idx ON public.tenants(slug);

-- Align timestamp defaults with Prisma @updatedAt semantics
ALTER TABLE "Subscription" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "Project" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
