/*
  Warnings:

  - You are about to drop the column `shippingId` on the `shipping_details` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `shippings` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `shippings` table. All the data in the column will be lost.
  - Added the required column `shipping_id` to the `shipping_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `shippings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `shippings` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "shipping_details" DROP CONSTRAINT "shipping_details_shippingId_fkey";

-- DropForeignKey
ALTER TABLE "shippings" DROP CONSTRAINT "shippings_orderId_fkey";

-- DropForeignKey
ALTER TABLE "shippings" DROP CONSTRAINT "shippings_userId_fkey";

-- AlterTable
ALTER TABLE "shipping_details" DROP COLUMN "shippingId",
ADD COLUMN     "shipping_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "shippings" DROP COLUMN "orderId",
DROP COLUMN "userId",
ADD COLUMN     "order_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shippings" ADD CONSTRAINT "shippings_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipping_details" ADD CONSTRAINT "shipping_details_shipping_id_fkey" FOREIGN KEY ("shipping_id") REFERENCES "shippings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
