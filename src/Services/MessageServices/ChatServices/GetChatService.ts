import { prisma } from "../../../PrismaHandler";



export class GetChatService {
    async execute(): Promise<any> {

        const chat = await prisma.chat.findUnique({
            where: {
                name: "Ecobuild",
            }
        })

        return chat
    }
}