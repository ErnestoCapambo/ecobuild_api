import { Request, Response } from "express";
import { GetUserService } from "../../Services/UserServices/getUserService";


export class GetUserController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new GetUserService()

        const result = await service.execute({id: userId})

        return response.json(result)
    }
}