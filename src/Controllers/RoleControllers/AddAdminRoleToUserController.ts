import { Request, Response } from "express";
import { AddAdminRoleTOUserService } from "../../Services/RoleServices/AddAdminRoleTOUserService";


export class AddAdminRoleToUserController{
    async handle(request: Request, response: Response){
        const { admin_id } = request.params
        const { user_ids } = request.body

        const service = new AddAdminRoleTOUserService()

        const result = await service.execute({
            admin_id,
            user_ids
        })

        return response.json(result)
    }
}