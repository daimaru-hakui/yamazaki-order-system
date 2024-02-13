-- DropIndex
DROP INDEX "customers_code_key";

-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "ediCode" TEXT,
ALTER COLUMN "code" DROP NOT NULL,
ALTER COLUMN "code" SET DATA TYPE TEXT;
