/*
  Warnings:

  - You are about to drop the column `color_id` on the `skus` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_color_id_fkey";

-- AlterTable
ALTER TABLE "skus" DROP COLUMN "color_id";
