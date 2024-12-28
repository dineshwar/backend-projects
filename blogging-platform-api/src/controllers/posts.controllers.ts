import { postService } from "../services/posts.service";
import { Request, Response } from "express";

export const postControllers = {
  async getPosts(request: Request, response: Response) {
    try {
      const { term } = request.params;
      const searchTerm = term ? String(term) : "";
      const posts = await postService.fetchAllPosts(searchTerm);
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
  async deletePost(request: Request, response: Response) {
    try {
      const { post_id } = request.params;
      const postId = Number(post_id);
      if (isNaN(postId)) {
        response.status(400).json({ message: "Invalid post id" });
        return;
      }
      await postService.deletePost(postId);
      response.status(200).json({ message: "Post deleted" });
      return;
    } catch (error) {
      response.status(500).json({ message: "Failed to fetch post" });
    }
  },
  async insertPost(request: Request, response: Response) {
    try {
      const { title, content, category, tags } = request.body;
      if (!title || typeof title != "string") {
        response.status(400).json({ message: "Invalid title" });
        return;
      }
      if (!content || typeof title != "string") {
        response.status(400).json({ message: "Invalid content" });
        return;
      }
      if (!category || typeof title != "string") {
        response.status(400).json({ message: "Invalid category" });
        return;
      }
      if (!tags || !Array.isArray(tags)) {
        response.status(400).json({ message: "Invalid tags" });
        return;
      }
      const post = await postService.insertPost({
        title: String(title),
        content: String(content),
        category: String(category),
        tags: tags,
      });
      response.status(200).json(post);
      return;
    } catch (error) {
      response.status(500).json({ message: "Failed to fetch post" });
    }
  },
  async updatePost(request: Request, response: Response) {
    try {
      const { post_id } = request.params;
      const { title, content, category, tags } = request.body;
      if (!title || !content || !category || !tags) {
        return response
          .status(400)
          .json({ message: "All fields are required" });
      }
      if (!title || typeof title != "string") {
        response.status(400).json({ message: "Invalid title" });
        return;
      }
      if (!content || typeof title != "string") {
        response.status(400).json({ message: "Invalid content" });
        return;
      }
      if (!category || typeof title != "string") {
        response.status(400).json({ message: "Invalid category" });
        return;
      }
      if (!tags || !Array.isArray(tags)) {
        response.status(400).json({ message: "Invalid tags" });
        return;
      }
      const post = await postService.updatePost(Number(post_id), {
        title: String(title),
        content: String(content),
        category: String(category),
        tags: tags,
      });
      response.status(200).json(post);
      return;
    } catch (error) {
      response.status(500).json({ message: "Failed to fetch post" });
    }
  },
};
