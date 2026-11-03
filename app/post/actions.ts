"use server";

import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { headers } from "next/headers";
import { initAuth } from "@/lib/auth";

export type PostType = {
  id: string;
  date: Date;
  title: string;
  content: string[];
};

export async function postBlog(post: PostType) {
  const auth = await initAuth();
  const thing = await auth.api.getSession({
    headers: await headers(),
  });

  if (!thing?.user) {
    throw new Error("You need to sign in before writing a post.");
  }

  if (!post.title.trim()) {
    throw new Error("Please add a title.");
  }

  if (post.content.length === 0) {
    throw new Error("Please add at least one paragraph.");
  }

  for (const paragraph of post.content) {
    if (!paragraph.trim()) {
      throw new Error("Please fill in every paragraph.");
    }
  }

  await dbConnect();
  await Post.create({
    id: post.id,
    date: post.date,
    title: post.title.trim(),
    content: post.content.map((paragraph) => paragraph.trim()),
  });
}
