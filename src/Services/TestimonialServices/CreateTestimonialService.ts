import { prisma } from "../../PrismaHandler";
import SocketConfig from "./../../sockets/index"


type TestimonialTypeRequest = {
    userId: string;
    description: string;
}

export class CreateTestimonialService{
    async execute({ userId, description }: TestimonialTypeRequest) {

        const newTestimonial = await prisma.testimonial.create({
            data: {
                author_id: userId,
                description: description
            }
        })

        SocketConfig.updateTestimonials(newTestimonial)


        return newTestimonial
    }
}