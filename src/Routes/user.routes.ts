import { Router } from "express";
import { CreateUserController } from "../Controllers/UserControllers/createUserController";

import upload from "../Config/multer";
import { GetUserController } from "../Controllers/UserControllers/getUserController";
import { ensuredAuthenticated } from "../middlewares/ensureAuthenticated";
import { DeleteUserController } from "../Controllers/UserControllers/deleteUserController";
import { UpdateUserController } from "../Controllers/UserControllers/UpdateUserController";
import { AddAdminRoleToUserController } from "../Controllers/RoleControllers/AddAdminRoleToUserController";
import { RemoveAdminRoleToUserController } from "../Controllers/RoleControllers/RemoveAdminRoleToUserController";


const routes = Router()

routes.post("/create", upload.single("photo"), new CreateUserController().handle);


routes.get("/:userId?", new GetUserController().handle);

routes.delete("/delete/:userId", ensuredAuthenticated(), new DeleteUserController().handle)

routes.put("/update/:userId", upload.single("photo"), ensuredAuthenticated(), new UpdateUserController().handle)

routes.put("/role-add/:admin_id", ensuredAuthenticated(), new AddAdminRoleToUserController().handle)

routes.put("/role-remove/:admin_id", ensuredAuthenticated(), new RemoveAdminRoleToUserController().handle)

export { routes }