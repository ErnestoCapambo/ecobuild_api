import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateResidueController } from "../Controllers/ResidueControllers/CreateResidueController";
import upload from "../Config/multer";


const routes = Router()

routes.post("/create/:userId", ensuredAuthenticated(), upload.single("photo"), new CreateResidueController().handle)

export { routes }