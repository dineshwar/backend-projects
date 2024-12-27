import { eq } from "drizzle-orm";
import { db } from "../db/connect";
import { postTable } from "../db/schema";

export async function getAllPost() {
  try {
    const posts = await db.select().from(postTable);
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getPost(post_id: number) {
  try {
    const post = await db
      .select()
      .from(postTable)
      .where(eq(postTable.id, post_id));
    return post;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function deletePost(post_id: number) {
  try {
    await db.delete(postTable).where(eq(postTable.id, post_id));
    return true;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}
