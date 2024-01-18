/*
  Warnings:

  - You are about to drop the column `colorId` on the `skus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_colorId_fkey";

-- AlterTable
ALTER TABLE "skus" DROP COLUMN "colorId",
ADD COLUMN     "color_id" INTEGER,
ADD COLUMN     "product_code" INTEGER;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
