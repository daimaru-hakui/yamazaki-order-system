/*
  Warnings:

  - You are about to drop the column `productId` on the `skus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[size_id,color_id,product_id]` on the table `skus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `skus` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_productId_fkey";

-- DropIndex
DROP INDEX "skus_size_id_color_id_productId_key";

-- AlterTable
ALTER TABLE "skus" DROP COLUMN "productId",
ADD COLUMN     "product_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "skus_size_id_color_id_product_id_key" ON "skus"("size_id", "color_id", "product_id");

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
