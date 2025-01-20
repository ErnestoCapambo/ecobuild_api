import { Request, Response } from "express";
import { GetUserByEmailAndPassword } from "../Services/UserServices/GetUserByEmailAndPassword";
import { decodePassword } from "../helpers/decodePassword";
import { generateToken } from "../middlewares/genereteToken";
import { LoginService } from "../Services/AuthServices/LoginService";


export class Login{
    async handle(request: Request, response: Response){
        const { email, password } = request.body
        
        const service = new GetUserByEmailAndPassword()
        const loginService = new LoginService()

        const result = await service.execute({email: email})
        
        if (result == null) return response.status(404).json({error: "Email ou senha incorretos."})

        const passwordIsMatch = await decodePassword(password, result.password)
            
        if (!passwordIsMatch) return response.status(404).json({error: "Email ou senha incorretos."})

        const {password: _,  ...userWithoutPassWord} = result


        await loginService.execute(userWithoutPassWord.id)

        const resp = {
            user: userWithoutPassWord,
            token: await generateToken({user_id: result.id})
        }

        return response.json(resp)
    }
}