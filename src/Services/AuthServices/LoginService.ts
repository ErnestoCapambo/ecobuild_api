import createHttpError from "http-errors";
import { decodePassword } from "../../helpers/decodePassword";
import { prisma } from "../../PrismaHandler";
import { generateToken } from "../../middlewares/genereteToken";



type UserRequestType = {
    email: string;
    password: string;
}

export class LoginService {
    async execute({ email, password }: UserRequestType): Promise<any> {

        
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

        if(!user) throw createHttpError(404, "Email ou senha incorretos.")

        const passwordIsMatch = await decodePassword(password, user.password)

        if(!passwordIsMatch) throw createHttpError(404, "Email ou senha incorretos.")

        const {password: _,  ...userWithoutPassWord} = user

        const result = {
            user: userWithoutPassWord,
            token: await generateToken({user_id: user.id})
        }

        return result
    }
}