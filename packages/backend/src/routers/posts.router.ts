import { Router } from "express";
import { PostsController } from "../controllers";
import { joi } from "../middlewares";

const postsRouter: Router = Router();
const postsController: PostsController = new PostsController();

postsRouter.get("/", postsController.get);
postsRouter.get("/:id", joi, postsController.get);

postsRouter.post("/", joi, postsController.post);

postsRouter.put("/", joi, postsController.put);
postsRouter.put("/:id", joi, postsController.put);

postsRouter.delete("/", joi, postsController.delete);
postsRouter.delete("/:id", joi, postsController.delete);

export default postsRouter;
