import { Request, Response } from "express";
import { DeleteResidueService } from "../../Services/ResidueServices/DeleteResidueService";



export class  DeleteResidueController{
    async handle(request: Request, response: Response){

        const { userId, residueId } = request.params 

        const service = new DeleteResidueService()

        const result = await service.execute({
            userId,
            residueId
        })

        return response.json(result)
    }
}