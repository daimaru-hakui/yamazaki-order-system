/*
  Warnings:

  - You are about to drop the column `name` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `products` table. All the data in the column will be lost.
  - Added the required column `product_name` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_number` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_cateogry_id_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "name",
DROP COLUMN "number",
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "product_number" TEXT NOT NULL,
ALTER COLUMN "cateogry_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cateogry_id_fkey" FOREIGN KEY ("cateogry_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
