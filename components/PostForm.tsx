"use client";

import type { PostType } from "@/app/post/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";

function PostForm({
  postBlog,
}: {
  postBlog: (post: PostType) => Promise<void>;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newPost, setNewPost] = useState<PostType>({
    id: crypto.randomUUID(),
    date: new Date(),
    title: "",
    content: [""],
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await postBlog(newPost);
      router.push("/blogs/" + encodeURIComponent(newPost.id));
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Unable to save the post. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl md:p-8" onSubmit={handleSubmit}>
      <input
        type="text"
        className="mb-4 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-white/40"
        placeholder="Title"
        required
        maxLength={200}
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
      />
      {newPost.content.map((paragraph, index) => (
        <textarea
          key={index}
          className="mb-4 min-h-36 w-full resize-y rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none transition focus:border-white/40"
          placeholder="Content"
          required
          value={paragraph}
          onChange={(e) => {
            const content = [...newPost.content];
            content[index] = e.target.value;
            setNewPost({ ...newPost, content });
          }}
        />
      ))}
      {error && <p className="mb-4 text-red-300" role="alert">{error}</p>}
      <button
        className="mr-3 rounded-full border border-white/15 px-5 py-3 font-bold"
        type="button"
        onClick={() =>
          setNewPost({ ...newPost, content: [...newPost.content, ""] })
        }
      >
        Add paragraph
      </button>
      <button className="rounded-full bg-white px-5 py-3 font-bold text-black disabled:opacity-50" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post"}
      </button>
    </form>
  );
}

export default PostForm;