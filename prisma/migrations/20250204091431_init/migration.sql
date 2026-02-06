-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "sub_status" "SubscriptionStatus" NOT NULL DEFAULT 'inactive',
    "sub_type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_stripe_cs_id" TEXT NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "sub_stripe_id" TEXT,
    "user_clerk_id" TEXT NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_email_key" ON "Subscription"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_last_stripe_cs_id_key" ON "Subscription"("last_stripe_cs_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_stripe_customer_id_key" ON "Subscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_user_clerk_id_key" ON "Subscription"("user_clerk_id");
