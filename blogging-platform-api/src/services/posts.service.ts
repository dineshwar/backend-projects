import { getAllPost, getPost } from "../models/posts.model";

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
  async getPost(post_id: number) {
    try {
      const post = await getPost(post_id);
      if (!post.length) {
        throw new Error("Post id not exist");
      }
      return post[0];
    } catch (error) {
      // Log or handle error appropriately
      console.error("Error in fetching post:", error);
      throw new Error("Failed to fetch post");
    }
  },
};
