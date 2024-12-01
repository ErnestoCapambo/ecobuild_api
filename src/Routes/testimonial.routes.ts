import { Router } from "express";
import { CreateTestimonialController } from "../Controllers/TestimonialControllers/CreateTestimonialController";


const routes = Router()

routes.post("/create/:userId", new CreateTestimonialController().handle)

export { routes }