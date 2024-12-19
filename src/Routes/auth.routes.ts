import { Router } from "express";
import { Login } from "../Auth/Login";
import { LogoutController } from "../Controllers/AuthControllers/LogoutController";


const routes = Router()


routes.post("/login", new Login().handle)

routes.put("/logout/:userId", new LogoutController().handle)

export { routes }