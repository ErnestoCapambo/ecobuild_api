import { Request, Response } from "express";
import { GetCountUserUnreadedNotificationService } from "../../Services/NotificationServices/GetCountUserUnreadedNotificationService";


export class GetCountUserUnreadedNotificationController{
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new GetCountUserUnreadedNotificationService()

        const reuslt = await service.execute(userId)

        return response.json(reuslt)
    }
}