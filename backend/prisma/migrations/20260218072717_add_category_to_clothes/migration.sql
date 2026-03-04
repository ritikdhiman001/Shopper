/*
  Warnings:

  - You are about to drop the `MenClothes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('MEN', 'WOMEN', 'KIDS');

-- DropTable
DROP TABLE "MenClothes";

-- CreateTable
CREATE TABLE "Clothes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Clothes_pkey" PRIMARY KEY ("id")
);
