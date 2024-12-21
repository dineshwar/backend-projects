import { getAllPost } from "../models/posts.model";

export const postService = {
  async fetchAllPosts() {
    try {
      const posts = await getAllPost();
      return posts;
    } catch (error) {
      // Log or handle error appropriately
      console.error("Error in fetching posts:", error);
      throw new Error("Failed to fetch posts");
    }
  },
};
