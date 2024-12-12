import createHttpError from "http-errors";
import { prisma } from "../../../PrismaHandler";
import { GetUserService } from "../../UserServices/getUserService";


export class GetUnreadedMessageService {
    async execute(user_id: string): Promise<number> {

        const user = await new GetUserService().execute({ id: user_id })

        if (user) {
            const totalOfUserUnreadedMessages = await prisma.seenMessage.count({
                where: {
                    user_id: user.id,
                    status: false,
                }
            })

            return totalOfUserUnreadedMessages

        } else {
            throw createHttpError(404, "User not Found!")
        }

    }
}