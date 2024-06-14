/*
  Warnings:

  - You are about to drop the column `variant` on the `ProductVariant` table. All the data in the column will be lost.
  - Added the required column `size` to the `ProductVariant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductVariant" DROP COLUMN "variant",
ADD COLUMN     "size" TEXT NOT NULL;
