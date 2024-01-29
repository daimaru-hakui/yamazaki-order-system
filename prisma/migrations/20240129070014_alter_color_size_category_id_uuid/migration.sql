/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `colors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sizes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `code` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `colors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `sizes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_cateogry_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_color_id_fkey";

-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_size_id_fkey";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
ADD COLUMN     "code" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "categories_id_seq";

-- AlterTable
ALTER TABLE "colors" DROP CONSTRAINT "colors_pkey",
ADD COLUMN     "code" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "colors_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "colors_id_seq";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "cateogry_id" SET DATA TYPE TEXT,
ALTER COLUMN "color_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "sizes" DROP CONSTRAINT "sizes_pkey",
ADD COLUMN     "code" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "sizes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "sizes_id_seq";

-- AlterTable
ALTER TABLE "skus" ALTER COLUMN "size_id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_cateogry_id_fkey" FOREIGN KEY ("cateogry_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
