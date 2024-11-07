import { Router } from "express";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetCountUserUnreadedNotificationController } from "../Controllers/NotificationControllers/GetCountUserUnreadedNotification";
import { GetNotificationController } from "../Controllers/NotificationControllers/GetNotificationController";
import { SetNotificationsAsReadedController } from "../Controllers/NotificationControllers/SetNotificationsAsReadedController";


const routes = Router()

routes.get("/unreaded-count/:userId", new GetCountUserUnreadedNotificationController().handle)

routes.put("/set-readed/:userId", new SetNotificationsAsReadedController().handle)

routes.get("/:userId", new GetNotificationController().handle)


export { routes }