import { Request, Response } from "express";
import { CreateResidueService } from "../../Services/ResidueServices/CreateResidueService";


export class CreateResidueController{
    async handle(request: Request, response: Response) {
        const { userId } = request.params
        const { condition, type, description } = request.body

        const service = new CreateResidueService()

        if(!request.file){
            return response.status(400).json({error: "Imagem de resíduo obrigatório."})
        }

        const result = await service.execute({
            condition,
            type,
            description,
            user_id: userId,
            file_name: String(request.file?.filename),
            file_path: String(request.file?.path)
        })

        return response.json(result)

    }
}