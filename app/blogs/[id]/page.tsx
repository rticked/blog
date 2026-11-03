import { redirect } from "next/navigation";
import Post from "@/lib/PostModel";
import dbConnect from "@/lib/mongoose";
import { Suspense } from "react";

type PageProps = { params: Promise<{ id: string }> };

async function BlogPost({ params }: PageProps) {
  const { id } = await params;
  await dbConnect();
  const post = await Post.findOne({ id: id });
  if (!post) redirect("/");

  return (
      <article className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-10">
        <h1 className="mb-3 text-4xl font-bold md:text-6xl">{post.title}</h1>
        <p className="border-b border-white/10 pb-6 text-zinc-400">{post.date.toLocaleDateString()}</p>
        <div className="pt-3">
          {post.content.map((paragraph: string, index: number) => (
            <p className="my-6 text-lg leading-8 text-zinc-300" key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
  );
}

export default function Page({ params }: PageProps) {
  return (
    <main className="mx-auto w-[calc(100%-40px)] max-w-4xl py-14">
      <Suspense fallback={<p className="text-center text-zinc-500">Loading blog post...</p>}>
        <BlogPost params={params} />
      </Suspense>
    </main>
  );
}