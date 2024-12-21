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
