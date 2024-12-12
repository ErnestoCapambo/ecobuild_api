import { prisma } from "../PrismaHandler";


export async function checkIfCompanyChatAlreadyExist(): Promise<boolean> {
    const companyChat = await prisma.chat.findUnique({
        where: {
            name: "Ecobuild",
            is_company: true
        }
    })

    if (companyChat) {
        return true
    }

    return false
}