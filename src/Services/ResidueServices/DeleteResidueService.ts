import { prisma } from "../../PrismaHandler";


type ResidueTypeRequest = {
    userId: string;
    residueId: string;
}

export class DeleteResidueService {
    async execute({ userId, residueId }: ResidueTypeRequest){

        await prisma.residue.delete({
            where: { id: residueId, userId: userId }
        })
    }
}