import { Request, Response } from "express";
import { ListUserService } from "../../Services/UserServices/ListUserService";


export class listUserController  {
    async handle(request: Request, response: Response) {

        const service = new ListUserService()

        const result = await service.execute()

        return response.json(result)
    }
}