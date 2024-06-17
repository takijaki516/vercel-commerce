/*
  Warnings:

  - You are about to drop the `_CollectionToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `collectionId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CollectionToProduct" DROP CONSTRAINT "_CollectionToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CollectionToProduct" DROP CONSTRAINT "_CollectionToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "collectionId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CollectionToProduct";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
