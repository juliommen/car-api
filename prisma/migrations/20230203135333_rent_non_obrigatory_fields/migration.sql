-- AlterTable
ALTER TABLE "Rent" ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT;