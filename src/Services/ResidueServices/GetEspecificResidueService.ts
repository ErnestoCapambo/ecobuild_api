import { prisma } from "../../PrismaHandler";


type ResidueTypeRequest = {
    residue_id: string;
}

export class GetEspecificResidueService {
    async execute({ residue_id }: ResidueTypeRequest): Promise<any> {

        const residue = await prisma.notification.findMany({
            where: { residue_id: residue_id },
            select: {
                sender: true,
                residue: true,
            }

        })

        return residue[0]
    }
}