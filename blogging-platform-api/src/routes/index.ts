import { postControllers } from "../controllers/posts.controllers";
import { Router } from "express";

const routes = Router();

routes.get("/posts", postControllers.getPosts);

export { routes };
