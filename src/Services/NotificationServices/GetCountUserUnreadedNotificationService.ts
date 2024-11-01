import { prisma } from "../../PrismaHandler";
import { GetUserService } from "../UserServices/getUserService";



export class GetCountUserUnreadedNotificationService {
    async execute(user_id: string): Promise<number | void>{
        const userService = new GetUserService()

        const user = await userService.execute({id:user_id})

        if(user){
            const unreadedNotifications = await prisma.notification.count({
                where: {receiver_id: user_id, read_status: false}
            })

            return unreadedNotifications
        }
    }
}