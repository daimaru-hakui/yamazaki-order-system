-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_product_id_fkey";

-- DropForeignKey
ALTER TABLE "skus" DROP CONSTRAINT "skus_size_id_fkey";

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skus" ADD CONSTRAINT "skus_size_id_fkey" FOREIGN KEY ("size_id") REFERENCES "sizes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
