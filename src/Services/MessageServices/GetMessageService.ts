import { prisma } from "../../PrismaHandler";


export class GetMessageService {
    async execute(): Promise<any> {

        const messages = await prisma.message.findMany({
            orderBy: {
                created_at: "asc"
            },
            include: {
                sender: true,
            }
        })

        return messages
    }
}
