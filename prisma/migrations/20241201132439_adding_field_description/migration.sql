/*
  Warnings:

  - Added the required column `description` to the `Testimonial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "description" TEXT NOT NULL;
