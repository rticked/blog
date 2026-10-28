import { postBlog } from "./actions";
import { initAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { io } from "next/cache";
import { Suspense } from "react";
import PostForm from "@/components/PostForm";

const POSTING_EMAIL = "demetmscratch@gmail.com";

async function PostPageContent() {
  await io();
  const auth = await initAuth();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.email !== POSTING_EMAIL) redirect("/");

  return (
    <main className="mx-auto w-[calc(100%-40px)] max-w-3xl py-14">
      <h1 className="mb-8 text-center text-4xl font-bold">Create Blog</h1>
      <PostForm postBlog={postBlog} />
    </main>
  );
}

function Page() {
  return (
    <Suspense fallback={<p>Checking access...</p>}>
      <PostPageContent />
    </Suspense>
  );
}

export default Page;