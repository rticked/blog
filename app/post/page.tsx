import { postBlog } from "./actions";
import PostForm from "@/components/PostForm";
import { io } from "next/cache";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { initAuth } from "@/lib/auth";

async function PostPageContent() {
  await io();
  const auth = await initAuth();
  const thing = await auth.api.getSession({
    headers: await headers(),
  });

  if (!thing?.user) {
    redirect("/signin");
  }

  return (
    <main className="mx-auto w-[calc(100%-40px)] max-w-3xl py-14">
      <h1 className="mb-8 text-center text-4xl font-bold">Create Blog</h1>
      <PostForm postBlog={postBlog} />
    </main>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<p>Checking access...</p>}>
      <PostPageContent />
    </Suspense>
  );
}