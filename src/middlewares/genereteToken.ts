import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { GetUserService } from "../Services/UserServices/getUserService";


type UserRequest = {
    user_id: string
}
    

export async function generateToken({ user_id }: UserRequest) {

    const secret = process.env.JWT_SECRET


    if(!secret) return createHttpError(500, "Chave secreta do JWT não foi definida.")

    const token = jwt.sign({}, secret, {
      subject: user_id,
      expiresIn: "1d",
    });
  
    return token;
  }