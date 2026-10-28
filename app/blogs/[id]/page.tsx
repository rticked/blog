import type { PostType } from "@/app/post/actions";
import { redirect } from "next/navigation";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { Suspense } from "react";

type PageProps = { params: Promise<{ id: string }> };

async function BlogPost({ params }: PageProps) {
  const { id } = await params;
  await dbConnect();
  const post = (await Post.findOne({ id: id })) as PostType;
  if (!post) redirect("/");

  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-10">
      <h1 className="mb-3 text-4xl font-bold md:text-6xl">{post.title}</h1>
      <div className="border-b border-white/10 pb-6 text-zinc-400">{post.date.toLocaleDateString()}</div>
      <div className="pt-3 [&>p]:my-6 [&>p]:text-lg [&>p]:leading-8 [&>p]:text-zinc-300">
        {post.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}

function Page({ params }: PageProps) {
  return (
    <main className="mx-auto w-[calc(100%-40px)] max-w-4xl py-14">
      <Suspense fallback={<p className="text-center text-zinc-500">Loading blog post...</p>}>
        <BlogPost params={params} />
      </Suspense>
    </main>
  );
}

export default Page;