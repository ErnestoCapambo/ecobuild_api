import { prisma } from "../../PrismaHandler"


export class CountClientService {
    async execute(): Promise<number> {

        const totalOfClients = await prisma.user.count()
        
        return totalOfClients
    }
}