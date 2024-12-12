import { prisma } from "../../../PrismaHandler";
import { GetUserService } from "../../UserServices/getUserService";


export class SetUnreadedMessagesAsReadedService {
    async execute(user_id: string): Promise<void> {
        const user = await new GetUserService().execute({id: user_id})

        if (user) {
            await prisma.seenMessage.updateMany({
                where: {
                    user_id: user.id,
                },

                data: {
                    status: true
                }
            })
        }
    }
}