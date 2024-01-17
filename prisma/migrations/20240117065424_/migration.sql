/*
  Warnings:

  - A unique constraint covering the columns `[size_id,color_id,productId]` on the table `skus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `skus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "skus" ADD COLUMN     "productId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "skus_size_id_color_id_productId_key" ON "skus"("size_id", "color_id", "productId");

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
