import { prisma } from "../../PrismaHandler";

export class ListResiduesService{
    async execute(): Promise<object>{
        const residues = await prisma.residue.findMany()

        return residues
    }
}