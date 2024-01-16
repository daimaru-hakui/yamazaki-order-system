/*
  Warnings:

  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_size_id_fkey";

-- DropTable
DROP TABLE "Size";

-- CreateTable
CREATE TABLE "sizes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
