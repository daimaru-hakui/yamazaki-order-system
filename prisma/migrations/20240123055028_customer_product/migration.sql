/*
  Warnings:

  - A unique constraint covering the columns `[customer_id,product_id]` on the table `customer_product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "customer_product_customer_id_product_id_key" ON "customer_product"("customer_id", "product_id");
