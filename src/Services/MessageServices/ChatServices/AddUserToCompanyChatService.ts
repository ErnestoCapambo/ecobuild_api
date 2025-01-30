import { prisma } from "../../../PrismaHandler";
import { GetUserService } from "../../UserServices/getUserService";
import { CreateChatService } from "./CreateChatServiceWithMemberService";
import { GetChatService } from "./GetChatService";


export class AddUserToCompanyChatService {
    async execute(user_id: string): Promise<any> {

        let chat = await new GetChatService().execute()
        if (!chat) {
            let newChat = await new CreateChatService().execute()
            chat = newChat
        }
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