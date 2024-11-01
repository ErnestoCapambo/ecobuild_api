import { prisma } from "../../PrismaHandler";
import SocketConfig from "../../sockets";
import { GetUserService } from "../UserServices/getUserService";


type NotificationTypeRequest = {
    description: string;
    user_id: string
}

export class CreateNotificationService {
    async execute({ description, user_id }: NotificationTypeRequest): Promise<void> {
        const userService = new GetUserService()
        
        const sender = await userService.execute({id: user_id})
        const allUsers = await userService.execute({})
        
        if(!sender) return

        for (const receiver of allUsers) {

            if(sender.id != receiver.id) {    
                const newNotification = await prisma.notification.create({
                    data: { description, receiver_id: receiver.id }
                })
    
                new SocketConfig().sendNotificationToConnectedUsers(newNotification)
            }
        }
    }
}