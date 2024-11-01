import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";


export async function verifyToken(request: Request, response: Response, next: NextFunction){
    const token = request.headers['authorization']?.split(' ')[1];

    const secret = process.env.JWT_SECRET

    if(!secret) return createHttpError(500, "Chave secreta do JWT não foi definida!")

    if (!token) return response.sendStatus(401);

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return response.sendStatus(403); // Se o token não for válido, retorna 403 Forbidden
        if (decoded && typeof decoded !== "string" && "user_id" in decoded) {
            // request.user_id = decoded.user_id; // Armazena o ID do usuário no objeto request
        }
        next(); // Continua para o próximo middleware ou rota
    });  
}