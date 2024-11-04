/*
  Warnings:

  - You are about to drop the column `name` on the `Residue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Residue" DROP COLUMN "name",
ADD COLUMN     "condition" TEXT NOT NULL DEFAULT 'null';
