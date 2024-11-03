import { prisma } from "../../PrismaHandler";
import { GetUserService } from "../UserServices/getUserService";


type AddRoleTypeRequest = {
    admin_id: string;
    user_ids: string[];
}

export class AddAdminRoleTOUserService {
    async execute({ admin_id, user_ids }: AddRoleTypeRequest): Promise<any> {
        const service = new GetUserService()

        const admin = await service.execute({ id: admin_id })

        if (admin.is_super === true || admin.is_admin === true) {
            for (const user_id of user_ids) {

                const user = await service.execute({ id: user_id })
                
                await prisma.user.update({
                    where: { id: user.id },
                    data: { is_admin: true }
                })
            }
        }
    }
}