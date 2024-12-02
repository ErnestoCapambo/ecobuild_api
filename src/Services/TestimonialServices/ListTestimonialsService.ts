import { prisma } from "../../PrismaHandler";


export class  ListTestimonialsService {
    async execute(): Promise<any>{

        const testimonials = await prisma.testimonial.findMany({
            include: {
                author: {
                    select: {
                        first_name: true,
                        last_name: true,
                        file_path: true,
                        file_name: true,
                        is_admin: true,
                    }
                },
                
            }
        })

        return testimonials
    }
}