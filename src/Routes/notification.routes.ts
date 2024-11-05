import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetCountUserUnreadedNotificationController } from "../Controllers/NotificationControllers/GetCountUserUnreadedNotification";
import { GetNotificationController } from "../Controllers/NotificationControllers/GetNotificationController";


const routes = Router()

routes.get("/unreaded-count/:userId", new GetCountUserUnreadedNotificationController().handle)


routes.get("/:userId", new GetNotificationController().handle)


export { routes }