/*
  Warnings:

  - You are about to drop the column `currencyCode` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "currencyCode",
ALTER COLUMN "soldCount" SET DEFAULT 0;
