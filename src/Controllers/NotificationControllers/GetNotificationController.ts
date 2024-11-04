import { Request, Response } from "express";
import { GetNotificationService } from "../../Services/NotificationServices/GetNotificationService";


export class GetNotificationController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new GetNotificationService()

        const result = await service.execute({user_id: userId})

        return response.json(result)
    }
}