/*
  Warnings:

  - You are about to drop the column `category_id` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `daily_rate` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `fine_amount` on the `Car` table. All the data in the column will be lost.
  - You are about to drop the column `license_plate` on the `Car` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[licensePlate]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dailyRate` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fineAmount` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `licensePlate` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Car" DROP CONSTRAINT "Car_category_id_fkey";

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "category_id",
DROP COLUMN "created_at",
DROP COLUMN "daily_rate",
DROP COLUMN "fine_amount",
DROP COLUMN "license_plate",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dailyRate" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "fineAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "licensePlate" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Car_licensePlate_key" ON "Car"("licensePlate");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
