import { Request, Response } from "express";
import { GetEspecificResidueService } from "../../Services/ResidueServices/GetEspecificResidueService";


export class GetEspecificResidueController {
    async handle(request: Request, response: Response) {
        const { residueId } = request.params

        const service = new GetEspecificResidueService()

        const result = await service.execute({ residue_id: residueId })

        return response.json(result)
    }
}