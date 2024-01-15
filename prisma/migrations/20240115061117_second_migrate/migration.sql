/*
  Warnings:

  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_customer_id_fkey";

-- DropTable
DROP TABLE "Customer";

-- CreateTable
CREATE TABLE "customers" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "tel" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
