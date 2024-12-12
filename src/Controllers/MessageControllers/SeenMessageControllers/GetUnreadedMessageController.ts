import { Request, Response } from "express";
import { GetUnreadedMessageService } from "../../../Services/MessageServices/SeenMessageServices/GetUnreadedMessageService";



export class GetUnreadedMessageController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new GetUnreadedMessageService()

        const result = await service.execute(userId)

        return response.json(result)
    }
}