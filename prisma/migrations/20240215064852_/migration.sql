/*
  Warnings:

  - You are about to drop the column `first_name` on the `order_details` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `order_details` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order_details" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "order_quantity" INTEGER NOT NULL DEFAULT 0;
