import { prisma } from "../../PrismaHandler";


export class  DeleteNotificationService {
    async execute(): Promise<any> {
        await prisma.notification.deleteMany()
    }
}