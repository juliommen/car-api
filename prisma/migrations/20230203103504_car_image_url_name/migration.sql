/*
  Warnings:

  - Added the required column `image` to the `CarsImages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarsImages" ADD COLUMN     "image" TEXT NOT NULL;
