import { postService } from "../services/posts.service";
import { Request, Response } from "express";

export const postControllers = {
  async getPosts(request: Request, response: Response) {
    try {
      const posts = await postService.fetchAllPosts();
      response.status(200).json(posts);
    } catch (error) {
      response.status(500).json({ message: "Failed to fetch posts" });
    }
  },
};
