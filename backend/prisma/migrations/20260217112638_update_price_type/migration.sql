/*
  Warnings:

  - You are about to drop the `menClothes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "menClothes";

-- CreateTable
CREATE TABLE "MenClothes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "MenClothes_pkey" PRIMARY KEY ("id")
);
