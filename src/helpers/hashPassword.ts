import bcrypt from "bcryptjs"


export async function hashPassword(password: string) {

    const salt = await bcrypt.genSalt(Number(process.env.HASH_SALT))

    const hashedPassword = await bcrypt.hash(password, salt)

    return hashedPassword
}
