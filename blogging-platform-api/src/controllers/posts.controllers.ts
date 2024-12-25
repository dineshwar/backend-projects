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
  async getPost(request: Request, response: Response) {
    try {
      const { post_id } = request.params;
      const postId = Number(post_id);
      if (isNaN(postId)) {
        response.status(400).json({ message: "Invalid post id" });
        return;
      }
      const post = await postService.getPost(postId);
      response.status(200).json(post);
      return;
    } catch (error) {
      response.status(500).json({ message: "Failed to fetch post" });
    }
  },
};
