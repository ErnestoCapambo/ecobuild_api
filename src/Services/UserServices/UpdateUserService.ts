import createHttpError from "http-errors";
import { prisma } from "../../PrismaHandler";
import { UserTypeRequesst } from "./createUserService";
import { deleteFile } from "../../helpers/deleteFile";


type UpdateUserRequest = Partial<Omit<UserTypeRequesst, "password">>

export class UpdateUserService {
    async execute({ user_id, age, email, file_path, firstName, lastName, location, phone, file_name }: UpdateUserRequest): Promise<any> {

        try {
            if (user_id) {
                const user = await prisma.user.findUnique({ where: { id: user_id } })
                if (user && user.file_name && file_name && file_path) {
                    try {
                        await deleteFile(String(user.file_name))

                    } catch (error: any) {
                        console.log(`${error}`)
                    }
                }

                await prisma.user.update({
                    where: {
                        id: user_id,
                    },
                    data: {
                        age: age ? age : user?.age,
                        email: email ? email : user?.email,
                        file_path: file_path ? file_path : user?.file_path,
                        file_name: file_name ? file_name : user?.file_name,
                        first_name: firstName ? firstName : user?.first_name,
                        last_name: lastName ? lastName : user?.last_name,
                        location: location ? location : user?.location,
                        phone_number: phone ? phone : user?.phone_number,
                    }
                })

                const updatedUser = await prisma.user.findUnique({ where: { id: user_id } })
                if (updatedUser) {                    
                    const { password: _, ...updatedUserWithoutPassword } = updatedUser
                    return updatedUserWithoutPassword
                }

            } else {
                return createHttpError(400, "Por favor, informe o id do Usuário.")
            }

        } catch (error: any) {
            console.error(error)
        }

    }
}