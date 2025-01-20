-- DropForeignKey
ALTER TABLE "SeenMessage" DROP CONSTRAINT "SeenMessage_user_id_fkey";

-- AlterTable
ALTER TABLE "Chat" ALTER COLUMN "user_ids" SET DEFAULT ARRAY[]::TEXT[];

-- AddForeignKey
ALTER TABLE "SeenMessage" ADD CONSTRAINT "SeenMessage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
