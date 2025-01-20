-- DropForeignKey
ALTER TABLE "Testimonial" DROP CONSTRAINT "Testimonial_author_id_fkey";

-- AddForeignKey
ALTER TABLE "Testimonial" ADD CONSTRAINT "Testimonial_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
