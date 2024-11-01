import { Request, Response } from "express";
import { CreateUserService } from "../../Services/UserServices/createUserService";


export class CreateUserController {
    async handle(request: Request, response: Response) {
        const {
            first_name,
            last_name,
            email,
            phone_number,
            location,
            password,
            age
        } = request.body

        const service = new CreateUserService()

        const result = await service.execute({
            firstName: first_name,
            lastName: last_name,
            email,
            phone: phone_number,
            location,
            age,
            password,
            file_path: String(request.file?.path),
            file_name: String(request.file?.filename),
        })

        return response.json(result)
    }
}