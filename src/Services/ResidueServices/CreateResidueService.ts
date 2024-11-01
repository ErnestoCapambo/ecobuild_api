import { prisma } from "../../PrismaHandler";
import { CreateNotificationService } from "../NotificationServices/CreateNotificationService";
import { GetUserService } from "../UserServices/getUserService";


type ResidueTypeRequest = {
    name: string;
    type: string;
    description: string;
    file_path: string;
    file_name: string;
    user_id: string;
}

export class CreateResidueService{
    async execute({ name, type, description, file_name, file_path, user_id }:ResidueTypeRequest): Promise<object | any> {
        const userService = new GetUserService()
        const notificationService = new CreateNotificationService()

        const user = await userService.execute({id: user_id})

        if(user){
            const newResidue =  await prisma.residue.create({
                data: {
                    name,
                    type,
                    description,
                    file_name,
                    file_path,
                    userId: user.id
                }
            })

            await notificationService.execute({
                description: `${user.first_name} ${user.last_name}, publicou um novo resíduo: ${newResidue.description}.`,
                user_id: user.id
            })

            return newResidue
        }
    }
}