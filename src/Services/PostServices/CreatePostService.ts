import { prisma } from "../../PrismaHandler";
import { CreateNotificationService } from "../NotificationServices/CreateNotificationService";
import { GetUserService } from "../UserServices/getUserService";


type PostTypeRequest = {
    description: string;
    author_id: string;
}

export class CreatePostService{
    async execute({ description, author_id }: PostTypeRequest): Promise<any>{
        const userService = new GetUserService()
        const notificationService = new CreateNotificationService()

        const user = await userService.execute({id: author_id}) 

        if (user) {
            const newPost = await prisma.post.create({
                data: { description, author_id }
            })

            await notificationService.execute({
                description: `${user.first_name} ${user.last_name} Publicou um novo conteúdo: ${newPost.description}`,
                sender_id: author_id
            })
        }
    }
}

