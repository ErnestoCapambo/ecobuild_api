import { prisma } from "../../../PrismaHandler";
import { AddRoleByDefaultService } from "../../RoleServices/AddRoleByDefaultService";


export async function CheckDefaultUserToCreate (): Promise<void> {

    const user = {
        first_name: "Ronaldo",
        last_name: "dos Santos",
        email: "ronaldodsantosrag@gmail.com",
        age: 22,
        location: "Viana",
        password: "1234",
        phone_number: "934531597",
        status: true,
        is_admin: true,
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
        await prisma.user.create({
            data: user
        })
    }
    
}