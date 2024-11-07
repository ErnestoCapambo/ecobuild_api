import { Request, Response } from "express";
import { SetNotificationsAsReadedService } from "../../Services/NotificationServices/SetNotificationsAsReadedService";



export class SetNotificationsAsReadedController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new SetNotificationsAsReadedService()

        const result = await service.execute({user_id: userId})

        return response.json(result)
    }
}