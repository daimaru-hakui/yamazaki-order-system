-- CreateTable
CREATE TABLE "customer_product" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "customer_product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "customer_product" ADD CONSTRAINT "customer_product_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_product" ADD CONSTRAINT "customer_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
