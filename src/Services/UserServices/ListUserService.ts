import { prisma } from "../../PrismaHandler"


export class ListUserService {
    async execute(): Promise<any> {

        const [allUsers, totalOfUsers] = await prisma.$transaction([
            prisma.user.findMany({
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
            }),

            prisma.user.count()
        ])

        return {
            users: allUsers,
            total: totalOfUsers
        }
    }
}