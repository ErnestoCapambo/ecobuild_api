/*
  Warnings:

  - You are about to drop the column `created_ate` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `created_at` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "created_ate",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL;
