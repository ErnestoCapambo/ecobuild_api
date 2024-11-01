import { hashPassword } from "../../helpers/hashPassword";
import { generateToken } from "../../middlewares/genereteToken";
import { prisma } from "../../PrismaHandler";


export type UserTypeRequesst = {
    user_id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string,
    file_path: string;
    file_name: string;
    location: string;
    password: string;
    age: number,
}

export class CreateUserService {
    async execute({ firstName, lastName, email, phone, file_path, file_name, location, password, age }: UserTypeRequesst): Promise<object>{

        const user = await prisma.user.create({
            data: {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phone,
                file_path: file_path,
                file_name: file_name,
                location: location,
                password: await hashPassword(password),
                age: Number(age)
            }
        })

        const token = await generateToken({user_id: user.id})

        
        return {user:user, token: token}
    }
}