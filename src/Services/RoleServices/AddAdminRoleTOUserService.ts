import { prisma } from "../../PrismaHandler";
import { GetUserService } from "../UserServices/getUserService";
import SocketConfig from "../../sockets/index" ;


type AddRoleTypeRequest = {
    admin_id: string;
    user_id: string;
}

export class AddAdminRoleTOUserService {
    async execute({ admin_id, user_id }: AddRoleTypeRequest): Promise<any> {
        const service = new GetUserService()

        const admin = await service.execute({ id: admin_id })

        const user = await service.execute({ id: user_id })

        if (admin.is_super == true || admin.is_admin == true) {
            // for (const user_id of user_ids) {

            // }
            
            await prisma.user.update({
                where: { id: user.id },
                data: { is_admin: true }
            })
    
            const _user = await service.execute({ id: user_id })

            SocketConfig.addAdminRole(_user)
        }
        
    }
}