import {
  getAllPost,
  getPost,
  deletePost,
  insertPost,
  updatePost,
} from "../models/posts.model";

interface PostData {
  title: string;
  content: string;
  category: string;
  tags: string[];
}

export const postService = {
  async fetchAllPosts(terms: string) {
    try {
      const posts = await getAllPost(terms);
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
  async deletePost(post_id: number) {
    try {
      await deletePost(post_id);
      return true;
    } catch (error) {
      // Log or handle error appropriately
      console.error("Unable to delete post:", error);
      throw new Error("Unable to delete post");
    }
  },
  async insertPost(post_data: PostData) {
    try {
      const post = await insertPost(post_data);
      return post;
    } catch (error) {
      // Log or handle error appropriately
      console.error("Unable to insert post:", error);
      throw new Error("Unable to insert post");
    }
  },
  async updatePost(post_id: number, post_data: PostData) {
    try {
      const post = await updatePost(post_id, post_data);
      return post;
    } catch (error) {
      // Log or handle error appropriately
      console.error("Unable to update post:", error);
      throw new Error("Unable to update post");
    }
  },
};
