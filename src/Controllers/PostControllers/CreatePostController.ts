import { Request, Response } from "express";
import { CreatePostService } from "../../Services/PostServices/CreatePostService";


export class CreatePostController {
    async handle(request: Request, response: Response) {
        
        const { userId } = request.params
        const { description } = request.body

        const service = new CreatePostService()

        const result = await service.execute({
            author_id: userId,
            description,
        })

        return response.json(result)
    }
}