import { prisma } from "../../../PrismaHandler";


type SeenMessageTypeRequest = {
    user_id: string;
    chat_id: string;
    message_id: number;
}

export class GenerateSeenMessage {
    async execute({ user_id, message_id, chat_id }: SeenMessageTypeRequest): Promise<any> {

        const seenMessage = await prisma.seenMessage.create({
            data: {
                message_id,
                user_id: user_id,
                chat_id
            }
        })

        return seenMessage
    }
}