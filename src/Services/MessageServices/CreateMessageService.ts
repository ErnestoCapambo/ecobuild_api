import { prisma } from "../../PrismaHandler";
import { GetUserService } from "../UserServices/getUserService";
import { GetChatService } from "./ChatServices/GetChatService";
import { GenerateSeenMessage } from "./SeenMessageServices/GenerateSeenMessageService";
import SocketConfig from "./../../sockets/index"


type MessageTypeRequest = {
    content: string;
    sender_id: string;
}


export class CreateMessageService {
    async execute({ content, sender_id }: MessageTypeRequest): Promise<any> {

        const sender = await new GetUserService().execute({id: sender_id})
        const chat = await new GetChatService().execute()

        const newMessage = await prisma.message.create({
            data: {
                content: content,
                sender_id: sender.id,
                chat_id: chat.id
            }
        })

        if (newMessage) {

            const seenMessage = new GenerateSeenMessage()
            SocketConfig.sendMessageToConectedUsers(newMessage)

            if (chat) {
                for (const user_id of chat.user_ids) {
                    if (user_id !== sender.id) {
                        await seenMessage.execute({ user_id: user_id, message_id: newMessage.id, chat_id: chat.id })
                    }
                }
            }

            return newMessage
        }        
    }
}