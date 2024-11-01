import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreatePostController } from "../Controllers/PostControllers/CreatePostController";

const routes = Router()

routes.post("/create/:userId", ensuredAuthenticated(), new CreatePostController().handle)

export { routes }