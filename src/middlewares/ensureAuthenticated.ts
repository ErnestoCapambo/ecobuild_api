import "express"
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import createHttpError from "http-errors";

export const ensuredAuthenticated = () => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const authHeaders = request.headers.authorization;
    
    if (!authHeaders) {
      return response.status(401).json({ "error": "Token is missing." });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return response.status(500).json({ "error": "Server configuration error." });
    }

    const [, token] = authHeaders.split(" ");

    try {
      // Verifica e decodifica o token
      const decoded = jwt.verify(token, secret) as JwtPayload;

      if (decoded && decoded.sub) {
        // Supondo que o `sub` no token representa o `userId`
        // request.userId = decoded.sub.toString();
        return next();
      } else {
        throw createHttpError(401, "Invalid token payload");
      }
    } catch (err) {
      // console.error(err);
      return response.status(401).json({ "error": "Unauthorized access" });
    }
  };
};
