import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { User } from "@prisma/client";

type UserRequestType = {
    id?: string;
}

export class GetUserService{
    async execute({ id }: UserRequestType): Promise<User | any[] | any>{
        if(!id){
            const allUsers = await prisma.user.findMany({
                orderBy: {
                    first_name: "asc"
                },
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    status: true,
                    is_admin: true,
                    is_super: true,
                    phone_number: true,
                    email: true,
                    file_name: true,
                    file_path: true,
                }
            })

            return allUsers
        }

        const user = prisma.user.findUnique({
            where: { id }
        })

        if(!user){
            throw createHttpError(404, "Usuário não encontrado.")
        }
        
        return user
    }
}