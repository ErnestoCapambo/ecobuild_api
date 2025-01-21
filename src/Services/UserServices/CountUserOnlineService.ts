import { prisma } from "../../PrismaHandler";


export class CountUserOnlineService {
    async execute(): Promise<number> {

        const usersOnline = await prisma.user.count({
            where: { status: true }
        })

        return usersOnline
    }
}