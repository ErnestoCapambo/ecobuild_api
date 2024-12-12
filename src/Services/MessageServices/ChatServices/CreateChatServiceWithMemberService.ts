import { prisma } from "../../../PrismaHandler";
import { GetUserService } from "../../UserServices/getUserService";


export class CreateChatServiceWithMemberService {
    async execute(): Promise<any> {

        const userService = new GetUserService()
        const users = await userService.execute({})


        const all_user_ids = users.map((user: any) => user.id)

        const newChat = await prisma.chat.create({
            data: {
                user_ids: all_user_ids,
                is_company: true
            }
        })

        return newChat
    }
}