import { prisma } from "../../PrismaHandler";
import { CreateNotificationService } from "../NotificationServices/CreateNotificationService";
import { GetUserService } from "../UserServices/getUserService";


type ResidueTypeRequest = {
    condition: string;
    type: string;
    description: string;
    file_path: string;
    file_name: string;
    user_id: string;
}

export class CreateResidueService{
    async execute({ condition, type, description, file_name, file_path, user_id }:ResidueTypeRequest): Promise<object | any> {
        const userService = new GetUserService()
        const notificationService = new CreateNotificationService()

        const user = await userService.execute({id: user_id})

        if(user){
            const newResidue =  await prisma.residue.create({
                data: {
                    condition,
                    type,
                    description,
                    file_name,
                    file_path,
                    userId: user.id
                }
            })

            await notificationService.execute({
                description: `publicou um novo resíduo.`,
                sender_id: user.id,
                residue_id: newResidue.id,
            })

            return newResidue
        }
    }
}