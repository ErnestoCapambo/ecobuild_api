import { Router } from "express"

import { routes as userRoutes } from "./user.routes"
import { routes as authRoutes } from "./auth.routes"
import { routes as notificationRoutes } from "./notification.routes"
import { routes as postRoutes } from "./post.routes"
import { routes as residueRoutes } from "./residue.routes"
import { routes as testimonialRoutes } from "./testimonial.routes"
import { routes as messageRoutes } from "./message.routes"


const routes = Router()

// User Routes
routes.use("/user", userRoutes)

// Auth Routes
routes.use("/auth", authRoutes)

routes.use("/notifications", notificationRoutes)

routes.use("/posts", postRoutes)

routes.use("/residue", residueRoutes)

routes.use("/testimonial", testimonialRoutes)

routes.use("/messages", messageRoutes)

export { routes }