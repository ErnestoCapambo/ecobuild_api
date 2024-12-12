import { Router } from "express";
import { CreateMessageController } from "../Controllers/MessageControllers/CreateMessageController";
import { GetMessageController } from "../Controllers/MessageControllers/GetMessageController";
import { GetUnreadedMessageController } from "../Controllers/MessageControllers/SeenMessageControllers/GetUnreadedMessageController";
import { SetUnreadedMessagesAsReadedController } from "../Controllers/MessageControllers/SeenMessageControllers/SetUnreadedMessagesAsReadedController";


const routes = Router()

routes.post("/create/:userId", new CreateMessageController().handle)

routes.get("/list", new GetMessageController().hendle)

routes.get("/unreaded-count/:userId", new GetUnreadedMessageController().handle)

routes.put("/set-readed/:userId", new SetUnreadedMessagesAsReadedController().handle)

export { routes }