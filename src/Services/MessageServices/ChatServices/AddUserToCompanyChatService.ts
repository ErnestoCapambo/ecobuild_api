import { prisma } from "../../../PrismaHandler";
import { GetUserService } from "../../UserServices/getUserService";
import { GetChatService } from "./GetChatService";


export class AddUserToCompanyChatService {
    async execute(user_id: string): Promise<any> {

        const chat = await new GetChatService().execute()
        const user = await new GetUserService().execute({id: user_id})

        await prisma.chat.update({
            where: {
                id: chat.id,
                name: "Ecobuild"
            },
            data: {
                user_ids: [...chat.user_ids, user.id]
            }
        })
    }
}