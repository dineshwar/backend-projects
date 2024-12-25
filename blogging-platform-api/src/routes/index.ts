import { postControllers } from "../controllers/posts.controllers";
import { Router } from "express";

const routes = Router();

routes.get("/posts", postControllers.getPosts);
routes.get("/posts/:post_id", postControllers.getPost);

export { routes };
