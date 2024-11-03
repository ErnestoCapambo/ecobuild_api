import { prisma } from "../../PrismaHandler";
import { GetUserService } from "../UserServices/getUserService";


type RomoveRoleTypeRequest = {
    admin_id: string;
    user_ids: string[];
}

export class RemoveAdminRoleToUserService {
    async execute({ admin_id, user_ids }: RomoveRoleTypeRequest): Promise<any> {
        const service = new GetUserService()

        const admin = await service.execute({ id: admin_id })

        if (admin.is_super === true || admin.is_admin === true) {
            for (const user_id of user_ids) {

                const user = await service.execute({ id: user_id })
                
                await prisma.user.update({
                    where: { id: user.id },
                    data: { is_admin: false }
                })
            }
        }
    }
}