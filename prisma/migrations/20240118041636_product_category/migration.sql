/*
  Warnings:

  - Made the column `cateogry_id` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_cateogry_id_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "cateogry_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cateogry_id_fkey" FOREIGN KEY ("cateogry_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
