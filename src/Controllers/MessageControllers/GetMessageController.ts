import { Request, Response } from "express";
import { GetMessageService } from "../../Services/MessageServices/GetMessageService";


export class GetMessageController {
    async hendle(request: Request, response: Response) {

        const service = new GetMessageService()

        const result = await service.execute()

        return response.json(result)
    }
}