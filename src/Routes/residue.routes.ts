import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateResidueController } from "../Controllers/ResidueControllers/CreateResidueController";
import upload from "../Config/multer";
import { ListResiduesController } from "../Controllers/ResidueControllers/ListResiduesController";
import { GetUserResiduesController } from "../Controllers/ResidueControllers/GetUserResiduesController";
import { DeleteResidueController } from "../Controllers/ResidueControllers/DeleteResidueController";


const routes = Router()

routes.post("/create/:userId", upload.single("photo"), new CreateResidueController().handle)

routes.get("/list-all", new ListResiduesController().handle)

routes.get("/:userId", new GetUserResiduesController().handle)

routes.delete("/:userId/:residueId", new DeleteResidueController().handle)

export { routes }