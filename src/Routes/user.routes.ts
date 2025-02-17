import { Router } from "express";
import { CreateUserController } from "../Controllers/UserControllers/createUserController";

import upload from "../Config/multer";
import { GetUserController } from "../Controllers/UserControllers/getUserController";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { DeleteUserController } from "../Controllers/UserControllers/deleteUserController";
import { UpdateUserController } from "../Controllers/UserControllers/UpdateUserController";
import { AddAdminRoleToUserController } from "../Controllers/RoleControllers/AddAdminRoleToUserController";
import { RemoveAdminRoleToUserController } from "../Controllers/RoleControllers/RemoveAdminRoleToUserController";
import { CountClientController } from "../Controllers/UserControllers/CountClientController";
import { listUserController } from "../Controllers/UserControllers/listUserController";
import { CountUserOnlineController } from "../Controllers/UserControllers/CountUserOnlineController";


const routes = Router()

routes.post("/create/", upload.single("photo"), new CreateUserController().handle);


routes.get("/count-clients", new CountClientController().handle);

routes.get("/online-count", new CountUserOnlineController().handle);

routes.get("/:userId?", new GetUserController().handle);

routes.get("/all-list", new listUserController().handle);

routes.delete("/delete/:admin_id/:userId", new DeleteUserController().handle);

routes.put("/update/:userId", upload.single("photo"), ensuredAuthenticated(), new UpdateUserController().handle);

routes.put("/role-add/:admin_id/:userId", new AddAdminRoleToUserController().handle);

routes.put("/role-remove/:admin_id/:userId", new RemoveAdminRoleToUserController().handle);

export { routes };