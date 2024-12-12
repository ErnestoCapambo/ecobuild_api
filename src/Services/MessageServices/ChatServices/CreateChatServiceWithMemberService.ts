import { prisma } from "../../../PrismaHandler";
import { GetUserService } from "../../UserServices/getUserService";


export class CreateChatService {
    async execute(): Promise<any> {

        const newChat = await prisma.chat.create({
            data: {
                is_company: true
            }
        })

        return newChat
    }
}