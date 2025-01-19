import { prisma } from "../../PrismaHandler"
import { GetUserService } from "../UserServices/getUserService"
import SocketConfig from "../../sockets/index"


export class AddRoleByDefaultService{
    async execute(user_id: string) : Promise<void> {
        const service = new GetUserService()

        const user = await service.execute({ id: user_id })

        await prisma.user.update({
            where: { id: user.id },
            data: { is_admin: true, is_super: true }
        })

        const _user = await service.execute({ id: user_id })

        SocketConfig.addAdminRole(_user)
    }
}