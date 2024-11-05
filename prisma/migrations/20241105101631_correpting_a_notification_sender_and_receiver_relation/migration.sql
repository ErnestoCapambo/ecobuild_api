-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_receiver_id_fkey";

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "sender_id" TEXT,
ALTER COLUMN "receiver_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
