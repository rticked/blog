"use server";

import { initAuth } from "@/lib/auth";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { headers } from "next/headers";

export interface PostType {
  id: string;
  date: Date;
  title: string;
  content: string[];
}

export async function postBlog(post: PostType) {
  const auth = await initAuth();
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || session.user.email !== "demetmscratch@gmail.com") {
    throw new Error("You are not authorized to create blog posts.");
  }

  if (
    !post ||
    typeof post.id !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      post.id,
    ) ||
    !(post.date instanceof Date) ||
    Number.isNaN(post.date.getTime()) ||
    typeof post.title !== "string" ||
    !post.title.trim() ||
    post.title.trim().length > 200 ||
    !Array.isArray(post.content) ||
    post.content.length === 0 ||
    post.content.some(
      (paragraph) => typeof paragraph !== "string" || !paragraph.trim(),
    )
  ) {
    throw new Error("Please provide a valid title and at least one paragraph.");
  }

  try {
    await dbConnect();
    await Post.create({
      id: post.id,
      date: post.date,
      title: post.title.trim(),
      content: post.content.map((paragraph) => paragraph.trim()),
    });
  } catch (error) {
    console.error("Failed to save blog post:", error);
    throw new Error("Unable to save the post. Please try again.");
  }
}
