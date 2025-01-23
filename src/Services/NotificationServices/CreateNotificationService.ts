import SocketConfig from "./../../sockets/index"
import { prisma } from "../../PrismaHandler";
import { GetUserService } from "../UserServices/getUserService";


type NotificationTypeRequest = {
    description: string;
    sender_id: string
}

export class CreateNotificationService {
    async execute({ description, sender_id }: NotificationTypeRequest): Promise<void> {
        const userService = new GetUserService()
        
        const sender = await userService.execute({id: sender_id})
        const allUsers = await userService.execute({})
        
        if(!sender) return

        for (const receiver of allUsers.users) {

            if(sender.id != receiver.id) {    
                const newNotification = await prisma.notification.create({
                    data: { description, receiver_id: receiver.id, sender_id: sender.id }
                })
    
                SocketConfig.sendNotificationToConnectedUsers(newNotification)
            }
        }
    }
}