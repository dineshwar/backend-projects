import { postControllers } from "../controllers/posts.controllers";
import { Router } from "express";

const routes = Router();

routes.get("/posts", postControllers.getPosts);
routes.get("/posts/:post_id", postControllers.getPost);
routes.delete("/posts/:post_id", postControllers.deletePost);
routes.post("/posts", postControllers.insertPost);

export { routes };
