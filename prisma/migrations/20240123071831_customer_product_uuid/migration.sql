/*
  Warnings:

  - The primary key for the `customer_product` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "customer_product" DROP CONSTRAINT "customer_product_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "customer_product_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "customer_product_id_seq";
