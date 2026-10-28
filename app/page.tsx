import type { PostType } from "./post/actions";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";
import { Suspense } from "react";
import { io } from "next/cache";

async function RecentPosts() {
  await io();
  await dbConnect();
  const posts = (await Post.find().sort({ date: -1 }).limit(4).lean()) as PostType[];

  if (posts.length === 0) {
    return (
      <Link href="/post" className="rounded-md border border-zinc-700 px-5 py-4 text-zinc-300 no-underline">
        No posts yet. Write the first one.
      </Link>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {posts.map((post) => (
        <Link
          href={`/blogs/${post.id}`}
          key={post.id}
          className="min-h-28 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center shadow-[inset_0_1px_rgba(255,255,255,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:border-white/25 hover:bg-white/[0.08] hover:shadow-[0_18px_50px_rgba(0,0,0,0.45),inset_0_1px_rgba(255,255,255,0.12)]"
        >
          <h3 className="mb-3 text-lg font-semibold text-white">{post.title}</h3>
          <p className="text-sm text-zinc-400">
            {new Date(post.date).toLocaleDateString()}
          </p>
        </Link>
      ))}
    </div>
  );
}

function Page() {
  return (
    <main className="min-h-[calc(100vh-64px)] overflow-hidden bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.12),transparent_38%),#000] text-white">
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to My Blog!</h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-7 text-zinc-400">
          This is a super interesting blog with all kinds of cool blog posts and stuff for people to check out!
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/blogs" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-[0_8px_30px_rgba(255,255,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:scale-105 hover:bg-zinc-100 no-underline">
            Read blogs
          </Link>
          <Link href="/about" className="rounded-full border border-white/15 bg-white/[0.05] px-6 py-3 text-sm font-bold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 no-underline">
            Learn more
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Recent Posts</h2>
        <Suspense fallback={<p className="text-center text-zinc-500">Loading posts...</p>}>
          <RecentPosts />
        </Suspense>
      </section>
    </main>
  );
}

export default Page;