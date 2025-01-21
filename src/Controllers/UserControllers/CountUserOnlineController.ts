import { Request, Response } from "express";
import { CountUserOnlineService } from "../../Services/UserServices/CountUserOnlineService";


export class CountUserOnlineController {
    async handle(request: Request, response: Response) {
        
        const service = new CountUserOnlineService()

        const result = await service.execute()

        return response.json(result)
    }
}