import { Router } from "express";
import { Login } from "../Auth/Login";


const routes = Router()


routes.post("/login", new Login().handle)

export { routes }