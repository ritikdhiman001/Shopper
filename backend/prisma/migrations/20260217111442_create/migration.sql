-- CreateTable
CREATE TABLE "menClothes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "discountPrice" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "menClothes_pkey" PRIMARY KEY ("id")
);
