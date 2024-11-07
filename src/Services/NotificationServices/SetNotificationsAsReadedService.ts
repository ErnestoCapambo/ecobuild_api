import { prisma } from "../../PrismaHandler";


type RequestTypeUser = {
    user_id: string;
}

export class SetNotificationsAsReadedService {
    async execute({ user_id }: RequestTypeUser): Promise<any>{

        await prisma.notification.updateMany({
            where: { receiver_id: user_id },
            data: { read_status: true }
        })
    }
}