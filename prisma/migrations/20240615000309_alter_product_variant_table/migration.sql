/*
  Warnings:

  - You are about to drop the column `availableCount` on the `ProductVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "availableCount",
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;
