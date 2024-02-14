/*
  Warnings:

  - Made the column `product_id` on table `skus` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "skus" ALTER COLUMN "product_id" SET NOT NULL;
