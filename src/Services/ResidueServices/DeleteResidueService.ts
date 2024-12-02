import { deleteFile } from "../../helpers/deleteFile";
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

        const residue = await prisma.residue.findUnique({
            where: { id: residueId, userId: userId }
        })

        if (residue?.file_name) {
            await deleteFile(residue.file_name)
        }

    }
}