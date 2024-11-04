import { PrismaClient } from "@prisma/client";
import { prisma } from "../../PrismaHandler";


type UserRequestType = {
    email: string;
}

export class GetUserByEmailAndPassword {
    async execute({ email }: UserRequestType): Promise<any> {

        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },

            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                file_path: true,
                file_name: true,
                phone_number: true,
                password: true,
                age: true,
                created_at: true,
                is_admin: true,
                is_super: true,
                location: true,
                status: true
            }
        })
        if (user) {
            return user
        } else {
            return null
        }
    }
}