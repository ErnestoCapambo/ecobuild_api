import bcrypt from "bcryptjs"


export async function decodePassword(password: string, hashedPassword: string){
    const isMatch = await bcrypt.compare(password, hashedPassword)

    return isMatch
}