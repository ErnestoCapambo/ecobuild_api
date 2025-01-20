import { Router } from "express";
import { Login } from "../Auth/Login";
import { LogoutController } from "../Controllers/AuthControllers/LogoutController";
import { SetStatus } from "../Auth/SetStatus";


const routes = Router()


routes.post("/login/:userId?", new Login().handle)

routes.put("/set-status/:userId", new SetStatus().handle)

routes.put("/logout/:userId", new LogoutController().handle)

export { routes }