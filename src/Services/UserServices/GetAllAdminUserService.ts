import { prisma } from "../../PrismaHandler";


export class GetAllAdminUserService {
    async execute(): Promise<any> {
        const admins = await prisma.user.findMany({
            where: { is_admin: true }
        })

        return admins
    }
}