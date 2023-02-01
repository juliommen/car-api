-- CreateTable
CREATE TABLE "_CarToSpecification" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CarToSpecification_AB_unique" ON "_CarToSpecification"("A", "B");

-- CreateIndex
CREATE INDEX "_CarToSpecification_B_index" ON "_CarToSpecification"("B");

-- AddForeignKey
ALTER TABLE "_CarToSpecification" ADD CONSTRAINT "_CarToSpecification_A_fkey" FOREIGN KEY ("A") REFERENCES "Car"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CarToSpecification" ADD CONSTRAINT "_CarToSpecification_B_fkey" FOREIGN KEY ("B") REFERENCES "Specification"("id") ON DELETE CASCADE ON UPDATE CASCADE;
