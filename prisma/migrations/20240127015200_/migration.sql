/*
  Warnings:

  - You are about to drop the `customer_product` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "customer_product" DROP CONSTRAINT "customer_product_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "customer_product" DROP CONSTRAINT "customer_product_product_id_fkey";

-- DropTable
DROP TABLE "customer_product";

-- CreateTable
CREATE TABLE "customer_products" (
    "id" TEXT NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "customer_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_products_customer_id_product_id_key" ON "customer_products"("customer_id", "product_id");

-- AddForeignKey
ALTER TABLE "customer_products" ADD CONSTRAINT "customer_products_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_products" ADD CONSTRAINT "customer_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
