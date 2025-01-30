-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "residue_id" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_residue_id_fkey" FOREIGN KEY ("residue_id") REFERENCES "Residue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
