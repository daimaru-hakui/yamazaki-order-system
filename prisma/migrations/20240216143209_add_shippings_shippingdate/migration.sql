/*
  Warnings:

  - Added the required column `shipping_date` to the `shippings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shippings" ADD COLUMN     "shipping_date" DATE NOT NULL;
