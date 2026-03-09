/*
  Warnings:

  - A unique constraint covering the columns `[unsubscribe_token]` on the table `WaitlistSignup` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WaitlistSignup" ADD COLUMN     "unsubscribe_token" TEXT,
ADD COLUMN     "unsubscribed_at" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "WaitlistSignup_unsubscribe_token_key" ON "WaitlistSignup"("unsubscribe_token");
