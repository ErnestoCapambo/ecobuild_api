import { Request, Response } from "express";
import { CountClientService } from "../../Services/UserServices/CountClientService";


export class CountClientController {
    async handle(request: Request, response: Response) {

        const service = new CountClientService()

        const result = await service.execute()

        return response.json(result)
    }
}