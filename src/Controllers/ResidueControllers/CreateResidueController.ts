import { Request, Response } from "express";
import { CreateResidueService } from "../../Services/ResidueServices/CreateResidueService";


export class CreateResidueController{
    async handle(request: Request, response: Response) {
        const { userId } = request.params
        const { name, type, description } = request.body

        const service = new CreateResidueService()

        const result = await service.execute({
            name,
            type,
            description,
            user_id: userId,
            file_name: String(request.file?.filename),
            file_path: String(request.file?.path)
        })

        return response.json(result)

    }
}