/*
  Warnings:

  - A unique constraint covering the columns `[product_number,color_id,cateogry_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "products_product_number_key";

-- CreateIndex
CREATE UNIQUE INDEX "products_product_number_color_id_cateogry_id_key" ON "products"("product_number", "color_id", "cateogry_id");
