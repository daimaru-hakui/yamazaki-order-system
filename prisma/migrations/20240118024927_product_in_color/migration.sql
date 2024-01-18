/*
  Warnings:

  - You are about to drop the column `color_id` on the `skus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_number]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[size_id,product_id]` on the table `skus` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_color_id_fkey";

-- DropIndex
DROP INDEX "skus_size_id_color_id_product_id_key";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "color_id" INTEGER;

-- AlterTable
ALTER TABLE "skus" DROP COLUMN "color_id",
ADD COLUMN     "colorId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "products_product_number_key" ON "products"("product_number");

-- CreateIndex
CREATE UNIQUE INDEX "skus_size_id_product_id_key" ON "skus"("size_id", "product_id");

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
