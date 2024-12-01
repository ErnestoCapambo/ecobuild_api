import { Request, Response } from "express";
import { CreateTestimonialService } from "../../Services/TestimonialServices/CreateTestimonialService";


export class CreateTestimonialController{
    async handle(request: Request, response: Response) {
        
        const { userId } = request.params
        const { description } = request.body

        const service = new CreateTestimonialService()

        const result = await service.execute({
            userId,
            description
        })

        return response.json(result)
    }
}