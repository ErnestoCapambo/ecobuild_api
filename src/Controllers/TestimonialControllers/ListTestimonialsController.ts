import { Request, Response } from "express";
import { ListTestimonialsService } from "../../Services/TestimonialServices/ListTestimonialsService";


export class ListTestimonialsController {
    async handle(request: Request, response: Response){
        
        const service = new ListTestimonialsService() 

        const result = await service.execute()

        return response.json(result)
    }
}