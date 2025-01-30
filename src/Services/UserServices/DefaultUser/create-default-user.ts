import { hashPassword } from "../../../helpers/hashPassword";
import { prisma } from "../../../PrismaHandler";
import { AddUserToCompanyChatService } from "../../MessageServices/ChatServices/AddUserToCompanyChatService";
import { AddRoleByDefaultService } from "../../RoleServices/AddRoleByDefaultService";


export async function CheckDefaultUserToCreate (): Promise<void> {

    const user = {
        first_name: "Ronaldo",
        last_name: "dos Santos",
        email: "ronaldodsantosrag@gmail.com",
        age: 22,
        location: "Viana",
        password: await hashPassword("1234"),
        phone_number: "934531597",
        status: false,
        is_admin: true,
        is_super: true
    }

    const userExist = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })

    if (userExist) {
        const Addrole = new AddRoleByDefaultService()

        await Addrole.execute(userExist.id)
    } else {
        const _user = await prisma.user.create({
            data: user
        })

        new AddUserToCompanyChatService().execute(_user.id)
    }
    
}