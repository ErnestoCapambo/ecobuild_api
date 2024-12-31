import { prisma } from "../../PrismaHandler";
import SocketConfig from "./../../sockets/index";


export class LogoutService {
    async execute(user_id: string): Promise<void> {

        await prisma.user.update({
            where: { id: user_id },
            data: { status: false }
        })

        SocketConfig.logOut(user_id)
    }
}