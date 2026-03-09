-- CreateTable
CREATE TABLE "WaitlistSignup" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "selected_products" JSONB NOT NULL,
    "selected_products_csv" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'waitlist',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WaitlistSignup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WaitlistSignup_source_created_at_idx" ON "WaitlistSignup"("source", "created_at");
