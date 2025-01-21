import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { User } from "@prisma/client";

type UserRequestType = {
    id?: string;
    page?: any;
    perPage?: any;
}

export class GetUserService{
    async execute({ id, page, perPage }: UserRequestType): Promise<User | any[] | any>{
        if(!id){

            if(page && perPage){

                const skip = (Number(page-1) * Number(perPage))
                const take = Number(perPage)

                const [users, total] = await prisma.$transaction([
                    prisma.user.findMany({
                        skip,
                        take,
                        orderBy: { first_name: "asc" },
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
                            age: true,
                        }
                    }),

                    prisma.user.count(),
                ])

                const totalPages = Math.ceil(total / take)

                return {
                    users,
                    pagination: {
                        currentPage: Number(page),
                        perPage: take,
                        totalPages,
                        totalItems: total,
                    }
                }
            }

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
                    age: true,
                }
            })

            return {
                users: allUsers
            }
        }

        const user = prisma.user.findUnique({
            where: { id },
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
                age: true,
            }
        })

        if(!user){
            throw createHttpError(404, "Usuário não encontrado.")
        }
        
        return user
    }
}