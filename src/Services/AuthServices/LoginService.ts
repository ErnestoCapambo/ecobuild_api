import { prisma } from "../../PrismaHandler";
import SocketConfig from "../../sockets/index";


export class LoginService {
    async execute(user_id: string): Promise<void> {

        await prisma.user.update({
            where: { id: user_id },
            data: { status: true }
        })

        SocketConfig.login(user_id)
    }
}