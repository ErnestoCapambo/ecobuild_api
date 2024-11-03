import { Request, response, Response } from "express";
import { RemoveAdminRoleToUserService } from "../../Services/RoleServices/RemoveAdminRoleToUserService";


export class RemoveAdminRoleToUserController {
    async handle(request: Request, reponse: Response){
        const { admin_id } = request.params
        const { user_ids } = request.body

        const service = new RemoveAdminRoleToUserService()

        const result = await service.execute({
            admin_id,
            user_ids
        })

        return response.json(result)
    }
}