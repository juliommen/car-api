-- CreateTable
CREATE TABLE "CarsImages" (
    "id" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CarsImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CarsImages" ADD CONSTRAINT "CarsImages_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
