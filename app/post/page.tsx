import { postBlog } from "./actions";
import { io } from "next/cache";
import { Suspense } from "react";
import PostForm from "@/components/PostForm";

async function PostPageContent() {
  await io();

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