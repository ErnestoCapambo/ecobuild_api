import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { User } from "@prisma/client";

type UserRequestType = {
    id?: string;
}

export class GetUserService{
    async execute({ id }: UserRequestType): Promise<User | any>{
        if(!id){
            const allUsers = await prisma.user.findMany()

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