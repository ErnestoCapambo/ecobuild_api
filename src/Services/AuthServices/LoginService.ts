import { prisma } from "../../PrismaHandler";



export class LoginService {
    async execute(user_id: string): Promise<void> {

        await prisma.user.update({
            where: { id: user_id },
            data: { status: true }
        })
    }
}