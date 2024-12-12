import { Request, Response } from "express";
import { CreateMessageService } from "../../Services/MessageServices/CreateMessageService";



export class CreateMessageController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params
        const { content } = request.body

        const service = new CreateMessageService()

        const result = await service.execute({
            content,
            sender_id: userId
        })

        return response.json(result)
    }
}