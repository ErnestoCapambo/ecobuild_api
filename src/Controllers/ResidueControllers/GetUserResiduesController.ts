import { Request, Response } from "express";
import { GetUserResiduesService } from "../../Services/ResidueServices/GetUserResiduesService";


export class GetUserResiduesController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params

        const service = new GetUserResiduesService()

        const result = await service.execute({ user_id: userId })

        return response.json(result)
    }
}