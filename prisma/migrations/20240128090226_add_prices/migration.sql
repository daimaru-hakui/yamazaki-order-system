/*
  Warnings:

  - Added the required column `user_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_details" ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "memo" TEXT;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "sku_id" TEXT NOT NULL,
    "start_price" DATE NOT NULL,
    "end_price" DATE NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "prices_sku_id_start_price_end_price_key" ON "prices"("sku_id", "start_price", "end_price");

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "skus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
