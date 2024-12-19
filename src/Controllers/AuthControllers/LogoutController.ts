import { Request, Response } from "express";
import { LogoutService } from "../../Services/AuthServices/LogoutService";



export class LogoutController {
    async handle(request: Request, response: Response){
        const { userId } = request.params

        const service = new LogoutService()

        const result = await service.execute(userId)

        return response.json(result)
    }
}