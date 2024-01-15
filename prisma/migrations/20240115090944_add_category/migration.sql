/*
  Warnings:

  - Added the required column `cateogry_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "cateogry_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cateogry_id_fkey" FOREIGN KEY ("cateogry_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
