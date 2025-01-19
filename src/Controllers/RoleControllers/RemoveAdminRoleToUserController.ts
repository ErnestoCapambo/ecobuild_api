import { Request, Response } from "express";
import { RemoveAdminRoleToUserService } from "../../Services/RoleServices/RemoveAdminRoleToUserService";


export class RemoveAdminRoleToUserController {
    async handle(request: Request, response: Response){
        const { admin_id, userId } = request.params
        // const { user_ids } = request.body

        const service = new RemoveAdminRoleToUserService()

        const result = await service.execute({
            admin_id,
            user_ids: userId
        })

        return response.json(result)
    }
}