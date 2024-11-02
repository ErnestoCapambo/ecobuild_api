import { Request, Response } from "express";
import { ListResiduesService } from "../../Services/ResidueServices/ListResiduesService";


export class ListResiduesController{
    async handle(request: Request, response: Response) {

        const service = new ListResiduesService()

        const result = await service.execute()

        return response.json(result)
    }
}