import { Request, Response } from "express";
import { SetUnreadedMessagesAsReadedService } from "../../../Services/MessageServices/SeenMessageServices/SetUnreadedMessagesAsReadedService";


export class SetUnreadedMessagesAsReadedController {
    async handle(request: Request, response: Response) {
        
        const { userId } = request.params

        const service = new SetUnreadedMessagesAsReadedService()

        const result = await service.execute(userId)


        return response.json(result)
    }
}