import type { PostType } from "../post/actions";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";

async function BlogList() {
  await connection();
  await dbConnect();
  const allPosts = (await Post.find().sort({ date: -1 })) as PostType[];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {allPosts.length > 0 ? (
        allPosts.map((post) => (
          <Link
            className="flex min-h-36 flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/25"
            href={`/blogs/${post.id}`}
            key={post.id}
          >
            <h2>{post.title}</h2>
            <div>{post.date.toLocaleDateString()}</div>
          </Link>
        ))
      ) : (
        <Link className="col-span-full text-center text-zinc-400" href="/post">No blogs yet, create one here!</Link>
      )}
    </div>
  );
}

function Page() {
  return (
    <main className="mx-auto w-[calc(100%-40px)] max-w-6xl py-14">
      <h1 className="mb-8 text-center text-4xl font-bold">Blogs</h1>
      <Suspense fallback={<p className="text-center text-zinc-500">Loading blogs...</p>}>
        <BlogList />
      </Suspense>
    </main>
  );
}

export default Page;