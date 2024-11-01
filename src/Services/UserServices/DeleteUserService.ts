import createHttpError from "http-errors"
import { prisma } from "../../PrismaHandler"
import { deleteFile } from "../../helpers/deleteFile"


type UserRequestType = {
    userId: string
}


export class DeleteUserService{
    async execute({ userId }: UserRequestType) {

        if (!userId) {
            return createHttpError(400, "Please insert the User id.")
        }

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if(!user) throw createHttpError(404, "User not found!")

        await prisma.user.delete({
            where: {
                id: user.id
            }
        })

        await deleteFile(String(user.file_name))

        return
    }
}

