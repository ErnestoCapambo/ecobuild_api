import { Request, Response } from "express";
import { DeleteUserService } from "../../Services/UserServices/DeleteUserService";


export class DeleteUserController{
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new DeleteUserService()

        const result = await service.execute({userId})

        return response.json(result)
    }
}