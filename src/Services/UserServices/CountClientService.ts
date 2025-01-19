import { prisma } from "../../PrismaHandler"


export class CountClientService {
    async execute(): Promise<number> {

        const totalOfClients = await prisma.user.count({
            where: {
                is_admin: false,
                is_super: false
            }
        })
        
        return totalOfClients
    }
}