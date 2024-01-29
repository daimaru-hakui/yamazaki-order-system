/*
  Warnings:

  - You are about to alter the column `name` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `name` on the `colors` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `name` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `address` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `tel` on the `customers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `first_name` on the `order_details` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `last_name` on the `order_details` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `memo` on the `order_details` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `product_number` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `product_name` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.
  - You are about to alter the column `name` on the `sizes` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `product_code` on the `skus` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - You are about to alter the column `jan_code` on the `skus` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(13)`.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "name" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "colors" ALTER COLUMN "name" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "customers" ALTER COLUMN "name" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "address" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "tel" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "order_details" ALTER COLUMN "first_name" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "last_name" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "memo" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "product_number" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "product_name" SET DATA TYPE VARCHAR(128);

-- AlterTable
ALTER TABLE "sizes" ALTER COLUMN "name" SET DATA TYPE VARCHAR(32);

-- AlterTable
ALTER TABLE "skus" ALTER COLUMN "product_code" SET DATA TYPE VARCHAR(13),
ALTER COLUMN "jan_code" SET DATA TYPE VARCHAR(13);

-- AlterTable
ALTER TABLE "users" DROP COLUMN "username",
ADD COLUMN     "name" VARCHAR(32);
