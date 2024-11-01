import { Request, Response } from "express";
import { UpdateUserService } from "../../Services/UserServices/UpdateUserService";


export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const { userId } = request.params
        const {
            first_name,
            last_name,
            email,
            phone_number,
            location,
            age
        } = request.body

        const service = new UpdateUserService()

        const result = await service.execute({
            user_id: userId,
            firstName: first_name,
            lastName: last_name,
            email,
            phone: phone_number,
            location,
            age: Number(age),
            file_path: String(request.file?.path),
            file_name: String(request.file?.filename),
        })

        return response.json(result)
    }
}