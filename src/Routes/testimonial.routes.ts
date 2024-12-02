import { Router } from "express";
import { CreateTestimonialController } from "../Controllers/TestimonialControllers/CreateTestimonialController";
import { ListTestimonialsController } from "../Controllers/TestimonialControllers/ListTestimonialsController";


const routes = Router()

routes.post("/create/:userId", new CreateTestimonialController().handle)

routes.get("/list", new ListTestimonialsController().handle)

export { routes }