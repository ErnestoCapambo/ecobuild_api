import { prisma } from "../../PrismaHandler";
import { GetUserService } from "../UserServices/getUserService";


type ResidueTypeRequest = {
    user_id: string;
}

export class GetUserResiduesService {
    async execute({ user_id }: ResidueTypeRequest): Promise<any>{
        const userService = new GetUserService()

        const user = await userService.execute({id: user_id})

        const userResidues = await prisma.residue.findMany({
            where: { userId: user.id },
            orderBy: { created_at: "asc" },
        })

        return userResidues
    }
}