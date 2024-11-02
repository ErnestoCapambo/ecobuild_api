import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateResidueController } from "../Controllers/ResidueControllers/CreateResidueController";
import upload from "../Config/multer";
import { ListResiduesController } from "../Controllers/ResidueControllers/ListResiduesController";


const routes = Router()

routes.post("/create/:userId", upload.single("photo"), new CreateResidueController().handle)

routes.get("/list", new ListResiduesController().handle)

export { routes }