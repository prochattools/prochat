-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('saaskit', 'prokit', 'uxkit');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('pending', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "ProvisioningStatus" AS ENUM ('pending', 'in_progress', 'completed', 'failed');

-- CreateEnum
CREATE TYPE "AccessStatus" AS ENUM ('pending', 'invited', 'active', 'revoked');

-- CreateEnum
CREATE TYPE "LicenseEventType" AS ENUM ('purchase_completed', 'github_username_linked', 'collaborator_invited', 'access_revoked', 'revocation_email_sent', 'access_restored', 'license_reactivated');

-- CreateTable
CREATE TABLE "License" (
    "id" TEXT NOT NULL,
    "purchaser_email" TEXT NOT NULL,
    "product" "ProductType" NOT NULL,
    "payment_reference" TEXT NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "provisioning_status" "ProvisioningStatus" NOT NULL DEFAULT 'pending',
    "access_status" "AccessStatus" NOT NULL DEFAULT 'pending',
    "github_username" TEXT,
    "revoked_at" TIMESTAMP(3),
    "revoked_reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "License_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LicenseEvent" (
    "id" TEXT NOT NULL,
    "license_id" TEXT NOT NULL,
    "type" "LicenseEventType" NOT NULL,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LicenseEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "License_payment_reference_key" ON "License"("payment_reference");

-- CreateIndex
CREATE INDEX "License_product_access_status_idx" ON "License"("product", "access_status");

-- CreateIndex
CREATE INDEX "LicenseEvent_license_id_type_idx" ON "LicenseEvent"("license_id", "type");

-- AddForeignKey
ALTER TABLE "LicenseEvent" ADD CONSTRAINT "LicenseEvent_license_id_fkey" FOREIGN KEY ("license_id") REFERENCES "License"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
