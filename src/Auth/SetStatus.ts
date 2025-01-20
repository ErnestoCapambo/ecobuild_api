import { Request, Response } from "express";
import { LoginService } from "../Services/AuthServices/LoginService";


export class SetStatus {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new LoginService()

        const result = await service.execute(userId)

        return response.json(result)
    }
}