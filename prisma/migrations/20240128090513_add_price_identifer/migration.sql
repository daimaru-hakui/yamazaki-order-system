-- DropForeignKey
ALTER TABLE "prices" DROP CONSTRAINT "prices_sku_id_fkey";

-- AddForeignKey
ALTER TABLE "prices" ADD CONSTRAINT "prices_sku_id_fkey" FOREIGN KEY ("sku_id") REFERENCES "skus"("id") ON DELETE CASCADE ON UPDATE CASCADE;
