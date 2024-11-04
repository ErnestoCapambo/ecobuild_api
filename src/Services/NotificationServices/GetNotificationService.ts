import { prisma } from "../../PrismaHandler";
import { GetUserService } from "../UserServices/getUserService";

type NotificationTypeRequest = {
    user_id: string;
}

export class GetNotificationService {
    async execute({ user_id }: NotificationTypeRequest){
        const userService = new GetUserService()

        const user = await userService.execute({id: user_id})

        const userNotifications = await prisma.notification.findMany({
            where: { receiver_id: user.id },          
        })

        return userNotifications
    }
}