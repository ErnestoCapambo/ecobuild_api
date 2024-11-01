import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetCountUserUnreadedNotificationController } from "../Controllers/NotificationControllers/GetCountUserUnreadedNotification";


const routes = Router()

routes.get("/unreaded/:userId", new GetCountUserUnreadedNotificationController().handle)

export { routes }